/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Menu,
  Modal,
  Pagination,
  rem,
  SimpleGrid,
  Spoiler,
  Text,
  Textarea,
  useMantineTheme
} from '@mantine/core'
import { NewFeed } from '../../interfaces/Post'
import path from 'src/modules/Share/constants/path'
import { formatTimeToReadable } from 'src/modules/Share/utils'
import {
  IconBookmark,
  IconBookmarkFilled,
  IconDotsVertical,
  IconEdit,
  IconHeart,
  IconHeartFilled,
  IconSend2,
  IconShare3,
  IconTrash,
  IconUsers,
  IconWorld
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import classes from '../ArticleCard/Carousel.module.css'
import '@mantine/carousel/styles.css'
import { LikePostCommandHandler, UnLikePostCommandHandler } from '../../services/Like'
import { BookmarkPostCommandHandler, UnBookmarkPostCommandHandler } from '../../services/Bookmark'
import { getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import { useNavigate, useParams } from 'react-router-dom'
import FormShare from '../FormShare/FormShare'
import { useDisclosure } from '@mantine/hooks'
import { CreateCommentCommandHandler } from '../../services/Comment'
import { useForm, UseFormReturnType } from '@mantine/form'
import { toast } from 'react-toastify'
import { GetListCommentQuery } from '../../services/Comment/getListComment.query'
import { chunk } from 'src/modules/Share/constants/enum'
import { useState } from 'react'
import CardComment from '../CardComment/CardComment'
import Swal from 'sweetalert2'
import { DeletePostCommandHandler } from '../../services'
import FormEditPost from '../FormEditPost/FormEditPost'

interface Props {
  post: NewFeed
  deletePostCommandHandler: DeletePostCommandHandler
}
interface FormValues {
  content: string
  post_id: string
}
const PostDetail = ({ post, deletePostCommandHandler }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [openedFormEdit, { open: openFormEdit, close: closeFormEdit }] = useDisclosure(false)
  const [activePage, setActivePage] = useState(1)

  const navigate = useNavigate()

  const { post_id } = useParams()
  const token = getAccessTokenFromLocalStorage()
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }
  const JWTInfo = parseJwt(token)
  const theme = useMantineTheme()
  const likePostCommandHandle = new LikePostCommandHandler()
  const handleLikePost = async (post_id: string) => {
    await likePostCommandHandle.handle(
      { post_id },
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }
  const unLikePostCommandHandle = new UnLikePostCommandHandler()
  const handleUnLikePost = (post_id: string) => {
    unLikePostCommandHandle.handle(
      { post_id },
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }
  const bookmarkPostCommandHandle = new BookmarkPostCommandHandler()
  const handleBookmarkPost = async (post_id: string) => {
    await bookmarkPostCommandHandle.handle(
      { post_id },
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }
  const unBookmarkCommandHandle = new UnBookmarkPostCommandHandler()
  const handleUnBookmarkPost = (post_id: string) => {
    unBookmarkCommandHandle.handle(
      { post_id },
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }
  const formCreateComment: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      content: '',
      post_id: post._id
    },
    validate: {
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const createCommentCommandHandle = new CreateCommentCommandHandler()
  const handleCreateComment = (data: any) => {
    createCommentCommandHandle.handle(
      data,
      () => {
        toast.success('Create comment successfully')
        formCreateComment.reset()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  const showPost = (post_id: string) => {
    navigate(`/post_detail/${post_id}`)
  }
  const getListComment = new GetListCommentQuery(post_id as string)
  const comments = getListComment.fetch()

  if (!comments) {
    return <div>Loading...</div>
  }
  const data = chunk(comments, 6)

  let items
  if (data && data.length > 0) {
    items = data[activePage - 1].map((item) => (
      <CardComment comment={item} user_id={JWTInfo.user_id} key={item._id} />
    ))
  }

  const handleDeletePost = (id: string) => {
    Swal.fire({
      title: 'Are you sure you want delete this post?',
      text: 'You will not be able to undo once confirmed!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostCommandHandler.handle(
          id,
          () => {
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
            navigate(path.home)
          },
          (error: any) => {
            console.log(error)
          }
        )
      }
    })
  }

  return (
    <div className=''>
      <Card withBorder padding='md' radius='md' className=''>
        <Group className='mb-2' justify='space-between'>
          <Group>
            <Avatar src={post.user.avatar} radius='lg' />
            <div className='inline-grid'>
              <Text fw={500} component='a' href={`${path.profile}/${post.user.username}`}>
                {post.user.username}
              </Text>
              {post.type == 0 ? (
                <Text fz='xs' c='dimmed' className='flex justify-center items-center gap-1'>
                  posted {formatTimeToReadable(post.created_at)}
                  {post.audience == 0 ? (
                    <IconWorld className='w-4 h-4' />
                  ) : (
                    <IconUsers className='w-4 h-4' />
                  )}
                </Text>
              ) : (
                <Text fz='xs' c='dimmed' className='flex justify-center items-center gap-1'>
                  shared {formatTimeToReadable(post.created_at)}
                  {post.audience == 0 ? (
                    <IconWorld className='w-4 h-4' />
                  ) : (
                    <IconUsers className='w-4 h-4' />
                  )}
                </Text>
              )}
            </div>
          </Group>
          {post.user._id === JWTInfo.user_id && (
            <Menu shadow='md' position='right-start'>
              <Menu.Target>
                <Button
                  variant='transparent'
                  size='xs'
                  rightSection={<IconDotsVertical style={{ width: rem(14), height: rem(14) }} />}
                  className='text-black font-medium'
                ></Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                  onClick={openFormEdit}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <Spoiler maxHeight={100} my='xs' showLabel='Show more' hideLabel='Hide'>
          {post.content}
        </Spoiler>
        {post.type == 1 && post.post_parent && (
          <Card
            withBorder
            padding='md'
            radius='md'
            className='hover:cursor-pointer hover:bg-[#F6F5F2]/70'
            onClick={() => showPost(post.post_parent?._id as string)}
          >
            <Group className='mb-2'>
              <Avatar src={post.post_parent.user?.avatar} radius='lg' />
              <div className='inline-grid'>
                <Text fw={500}>{post.post_parent.user?.username}</Text>
                {post.post_parent.type == 0 ? (
                  <Text fz='xs' c='dimmed' className='flex justify-center items-center gap-1'>
                    posted {formatTimeToReadable(post.post_parent.created_at)}
                    {post.audience == 0 ? (
                      <IconWorld className='w-4 h-4' />
                    ) : (
                      <IconUsers className='w-4 h-4' />
                    )}
                  </Text>
                ) : (
                  <Text fz='xs' c='dimmed' className='flex justify-center items-center gap-1'>
                    shared {formatTimeToReadable(post.post_parent.created_at)}
                    {post.audience == 0 ? (
                      <IconWorld className='w-4 h-4' />
                    ) : (
                      <IconUsers className='w-4 h-4' />
                    )}
                  </Text>
                )}
              </div>
            </Group>
            <Text className='font-bold text-[#3e3f5e] mb-4'>{post.post_parent.content}</Text>
            <div className='flex flex-row justify-center items-center gap-4 mb-4'>
              {post.post_parent.medias &&
                post.post_parent.medias[0].type == 0 &&
                post.post_parent.medias.length > 0 &&
                post.post_parent.medias.map((image, index) => {
                  return (
                    <BackgroundImage
                      className='relative shadow-lg w-48 h-48 flex justify-end items-start'
                      src={image.url}
                      key={index}
                      radius='sm'
                    ></BackgroundImage>
                  )
                })}
              {post.post_parent.medias &&
                post.post_parent.medias[0].type == 1 &&
                post.post_parent.medias.length > 0 &&
                post.post_parent.medias.map((video, index) => {
                  return (
                    <Card.Section className='w-80 px-4 m-auto'>
                      <video controls key={index}>
                        <source src={video.url} type='video/mp4' />
                      </video>
                    </Card.Section>
                  )
                })}
            </div>
            <Group>
              {post.post_parent.hashtags &&
                post.post_parent.hashtags.length > 0 &&
                post.post_parent.hashtags.map((hashtag, index) => (
                  <Badge w='fit-content' variant='light' key={index}>
                    {hashtag.name}
                  </Badge>
                ))}
            </Group>
          </Card>
        )}
        <Group>
          {post.hashtags.length != 0 &&
            post.hashtags.map((hashtag, index) => (
              <Badge w='fit-content' variant='light' key={index}>
                {hashtag.name}
              </Badge>
            ))}
        </Group>
        {post.medias.length != 0 && post.medias[0].type == 0 && (
          <Card.Section className='px-4'>
            <Carousel withIndicators height={400} slideGap='md' align='start' classNames={classes}>
              {post.medias.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image src={image.url} radius='md' h={400} fit='contain' />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card.Section>
        )}
        {post.medias.length != 0 && post.medias[0].type == 1 && (
          <Card.Section className='w-80 px-4 m-auto'>
            {post.medias.map((video, index) => (
              <video controls key={index}>
                <source src={video.url} type='video/mp4' />
              </video>
            ))}
          </Card.Section>
        )}
        <Card.Section className='mt-4 mb-[-5] mx-[-5] py-[10px] px-5'>
          <Group gap={2}>
            {post.isLike ? (
              <ActionIcon variant='subtle' color='gray' onClick={() => handleUnLikePost(post._id)}>
                <IconHeartFilled
                  style={{ width: rem(60), height: rem(60) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon variant='subtle' color='gray' onClick={() => handleLikePost(post._id)}>
                <IconHeart
                  style={{ width: rem(60), height: rem(60) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
            {post.isBookmark ? (
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => handleUnBookmarkPost(post._id)}
              >
                <IconBookmarkFilled
                  style={{ width: rem(60), height: rem(60) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => handleBookmarkPost(post._id)}
              >
                <IconBookmark
                  style={{ width: rem(60), height: rem(60) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
            <ActionIcon variant='subtle' color='gray' onClick={open}>
              <IconShare3
                style={{ width: rem(60), height: rem(60) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
          <Text fz='xs' c='dimmed'>
            {post.likes} likes
          </Text>
        </Card.Section>
      </Card>
      <Modal size={'xl'} opened={opened} onClose={close} title='Share Post' centered>
        <FormShare post={post} />
      </Modal>
      <Modal size={'xl'} opened={openedFormEdit} onClose={closeFormEdit} title='Edit Post' centered>
        <FormEditPost post={post} closeModal={closeFormEdit} />
      </Modal>
      <div className='mt-4 w-[60%] mx-auto'>
        <form onSubmit={formCreateComment.onSubmit(handleCreateComment)}>
          <Card withBorder padding='md'>
            <Card.Section>
              <Textarea
                variant='unstyled'
                placeholder='Write a comment...'
                className='px-4'
                {...formCreateComment.getInputProps('content')}
              />
            </Card.Section>
            <Group justify='space-between'>
              <ActionIcon
                type='submit'
                variant='subtle'
                color='dark'
                disabled={formCreateComment.getInputProps('content').value === ''}
              >
                <IconSend2 style={{ width: rem(60), height: rem(60) }} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Card>
        </form>
        <div className='mt-4'>
          {comments && <SimpleGrid cols={1}>{items}</SimpleGrid>}
          <Pagination
            total={data.length}
            value={activePage}
            onChange={setActivePage}
            mt='md'
            className='flex justify-center '
            withEdges
          />
        </div>
      </div>
    </div>
  )
}

export default PostDetail
