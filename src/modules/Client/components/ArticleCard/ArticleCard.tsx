import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
  Spoiler,
  Modal,
  BackgroundImage
} from '@mantine/core'
import {
  IconHeart,
  IconBookmark,
  IconHeartFilled,
  IconBookmarkFilled,
  IconShare3,
  IconWorld,
  IconUsers,
  IconMessage2
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import classes from './Carousel.module.css'
import { NewFeed } from '../../interfaces/Post'
import { formatTimeToReadable } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import { useDisclosure } from '@mantine/hooks'
import FormShare from '../FormShare/FormShare'
import { useNavigate } from 'react-router-dom'

interface Props {
  post: NewFeed
  handleLikePost?: (post_id: string) => void
  handleUnLikePost?: (post_id: string) => void
  handleBookmarkPost?: (post_id: string) => void
  handleUnBookmarkPost?: (post_id: string) => void
}
const ArticleCard = ({
  post,
  handleLikePost,
  handleUnLikePost,
  handleBookmarkPost,
  handleUnBookmarkPost
}: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const showPost = (post_id: string) => {
    navigate(`/post_detail/${post_id}`)
  }
  return (
    <Card withBorder padding='md' radius='md' className='my-10'>
      <Group className='mb-2'>
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
      <Spoiler
        maxHeight={100}
        my='xs'
        showLabel='Show more'
        hideLabel='Hide'
        className='font-medium'
      >
        {post.content}
      </Spoiler>
      {post.medias.length != 0 && post.medias[0].type == 0 && (
        <Card.Section className='px-4'>
          <Carousel withIndicators height={400} slideGap='md' align='start' classNames={classes}>
            {post.medias.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image src={image.url} radius='md' h={400} fit='cover' />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>
      )}
      {post.medias.length != 0 && post.medias[0].type == 1 && (
        <Card.Section className='px-4 m-auto'>
          {post.medias.map((video, index) => (
            <video controls key={index}>
              <source src={video.url} type='video/mp4' />
            </video>
          ))}
        </Card.Section>
      )}
      {/* Bai viet la type = share va post.post_parent._id ton tai thi hien thi Card  */}
      {post.type == 1 && post.post_parent?._id && (
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
          <Text className='font-medium text-[#3e3f5e] mb-4'>{post.post_parent.content}</Text>
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
                  <video controls key={index}>
                    <source src={video.url} type='video/mp4' />
                  </video>
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
      {post.type == 1 && !post.post_parent?._id && (
        <Card
          withBorder
          padding='md'
          radius='md'
          className='hover:cursor-pointer hover:bg-[#F6F5F2]/70'
        >
          <Text className='text-center'>Post not found</Text>
        </Card>
      )}

      <Group my={'sm'}>
        {post.hashtags.length != 0 &&
          post.hashtags.map((hashtag, index) => (
            <Badge w='fit-content' variant='light' key={index}>
              {hashtag.name}
            </Badge>
          ))}
      </Group>
      <Card.Section className='mt-4 mb-[-5] mx-[-5] py-[10px] px-5'>
        <Group justify='space-between'>
          <Text fz='xs' c='dimmed'>
            {post.likes} people liked this
          </Text>
          <Group gap={0}>
            {post.isLike ? (
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => handleUnLikePost && handleUnLikePost(post._id)}
              >
                <IconHeartFilled
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => handleLikePost && handleLikePost(post._id)}
              >
                <IconHeart
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
            {post.isBookmark ? (
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => handleUnBookmarkPost && handleUnBookmarkPost(post._id)}
              >
                <IconBookmarkFilled
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => handleBookmarkPost && handleBookmarkPost(post._id)}
              >
                <IconBookmark
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
            <ActionIcon variant='subtle' color='gray' onClick={() => showPost(post._id)}>
              <IconMessage2
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.gray[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant='subtle' color='gray' onClick={open}>
              <IconShare3
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
      <Modal size={'xl'} opened={opened} onClose={close} title='Share Post' centered>
        <FormShare post={post} />
      </Modal>
    </Card>
  )
}

export default ArticleCard
