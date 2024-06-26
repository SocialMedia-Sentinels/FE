/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Menu,
  rem,
  ScrollArea,
  Text,
  useMantineTheme
} from '@mantine/core'
import { Post } from '../../interface/Posts/post.type'
import { Carousel } from '@mantine/carousel'
import classes from '../../../Client/components/ArticleCard/Carousel.module.css'
import '@mantine/carousel/styles.css'
import {
  IconBookmarkFilled,
  IconDotsVertical,
  IconHeartFilled,
  IconShare3,
  IconTrash,
  IconUsers,
  IconWorld
} from '@tabler/icons-react'
import { formatTimeToReadable } from 'src/modules/Share/utils'
import { GetListCommentQuery } from 'src/modules/Client/services/Comment/getListComment.query'
import CardComment from 'src/modules/Client/components/CardComment/CardComment'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { AdminDeletePostCommandHandler } from '../../services/adminDeletePost.command-handler'

interface Props {
  post: Post
  onClose: () => void
}
const ModalPostDetail = ({ post, onClose }: Props) => {
  const theme = useMantineTheme()
  const getListComment = new GetListCommentQuery(post._id as string)
  const comments = getListComment.fetch()

  const navigate = useNavigate()
  const adminDeletePostCommandHandler = new AdminDeletePostCommandHandler()

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
        adminDeletePostCommandHandler.handle(
          id,
          () => {
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
            onClose()
            navigate(path.posts)
          },
          (error: any) => {
            console.log(error)
          }
        )
      }
    })
  }
  return (
    <Card withBorder radius='md' p='md' className=''>
      <Grid>
        {post.medias.length > 0 && (
          <Grid.Col span={7} className='shadow-lg'>
            {post.medias.length != 0 && post.medias[0].type == 0 && (
              <Card.Section className='px-4'>
                <Carousel
                  withIndicators
                  height={400}
                  slideGap='md'
                  align='start'
                  classNames={classes}
                >
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
          </Grid.Col>
        )}

        <Grid.Col span={5} className='px-4'>
          <Group>
            <Avatar src={post.user.avatar} radius='xl' size='50' />
            <div className='inline-grid'>
              <Text fw={500}>{post.user.username}</Text>
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
                  leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group className='my-2'>
            {post.hashtags &&
              post.hashtags.length > 0 &&
              post.hashtags.map((hashtag, index) => (
                <Badge w='fit-content' variant='light' key={index}>
                  {hashtag.name}
                </Badge>
              ))}
          </Group>
          <Text>{post.content}</Text>
          <Card.Section className='mt-4 mb-[-5] mx-[-5] py-[10px] px-5'>
            <Group gap={2}>
              <IconHeartFilled
                style={{ width: rem(20), height: rem(30) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
              <IconBookmarkFilled
                style={{ width: rem(20), height: rem(30) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
              <IconShare3
                style={{ width: rem(20), height: rem(30) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Group>
            <Text fz='xs' c='dimmed'>
              {post.likes} likes
            </Text>
          </Card.Section>
          <ScrollArea h={300}>
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => <CardComment key={comment._id} comment={comment} />)}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Card>
  )
}

export default ModalPostDetail
