import { Fragment, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import postService from '../../services/Post/post.service'
import { NewFeed } from '../../interfaces/Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from '../../components/ArticleCard'
import { Button, Loader, Menu, rem } from '@mantine/core'
import { LikePostCommandHandler } from '../../services/Like'
import likeService from '../../services/Like/like.service'
import bookmarkService from '../../services/Bookmark/bookmark.service'
import { BookmarkPostCommandHandler } from '../../services/Bookmark'
import FormPost from '../../components/FormPost'
import { useDisclosure } from '@mantine/hooks'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconArrowBigUpLine, IconChevronDown, IconFlame } from '@tabler/icons-react'

const HomePage = () => {
  const [posts, setPosts] = useState<NewFeed[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const sort = queryParams.get('sort') || 'none'

  const {
    data: res,
    isLoading,
    error
  } = useQuery({
    queryKey: ['new-feeds', { page: pageNumber, limit: 10, sort }],
    queryFn: () => postService.getNewFeeds({ page: pageNumber.toString(), limit: '10', sort }),
    keepPreviousData: true,
    onSuccess: (data) => {
      setPosts((prevPosts) => [...prevPosts, ...data.data.result])
    }
  })

  const fetchMoreData = () => {
    setPageNumber((prev) => prev + 1)
  }

  const handleSortChange = (sortValue: string) => {
    queryParams.set('sort', sortValue)
    navigate({ search: queryParams.toString() })
    setPosts([]) // Reset posts khi sort thay đổi
    setPageNumber(1) // Reset page number
  }

  useEffect(() => {
    setPageNumber(1) // Reset page number khi giá trị sort thay đổi
    setPosts([]) // Reset posts khi giá trị sort thay đổi
  }, [sort])

  const likePostCommandHandle = new LikePostCommandHandler()
  const handleLikePost = (post_id: string) => {
    likePostCommandHandle.handle(
      { post_id },
      () => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === post_id ? { ...post, isLike: true, likes: post.likes + 1 } : post
          )
        )
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  const unLikePostMutation = useMutation((post_id: string) => likeService.unLikePost(post_id), {
    onSuccess: (_data, post_id) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === post_id ? { ...post, isLike: false, likes: post.likes - 1 } : post
        )
      )
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleUnLikePost = (post_id: string) => {
    unLikePostMutation.mutate(post_id)
  }

  const bookmarkPostCommandHandle = new BookmarkPostCommandHandler()
  const handleBookmarkPost = (post_id: string) => {
    bookmarkPostCommandHandle.handle(
      { post_id },
      () => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === post_id
              ? { ...post, isBookmark: true, bookmarks: post.bookmarks + 1 }
              : post
          )
        )
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  const unBookmarkPostMutation = useMutation(
    (post_id: string) => bookmarkService.unBookmarkPost(post_id),
    {
      onSuccess: (_data, post_id) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === post_id
              ? { ...post, isBookmark: false, bookmarks: post.bookmarks - 1 }
              : post
          )
        )
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  const handleUnBookmarkPost = (post_id: string) => {
    unBookmarkPostMutation.mutate(post_id)
  }

  if (isLoading) return <Loader size={50} />

  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='Home page' />
      </Helmet>
      {!error ? (
        <div className='px-40 w-full'>
          <FormPost close={close} open={open} opened={opened} />
          <Menu shadow='md' position='right-start'>
            <Menu.Target>
              <Button
                variant='transparent'
                size='xs'
                rightSection={<IconChevronDown style={{ width: rem(14), height: rem(14) }} />}
                className='text-black font-medium'
              >
                Sorting
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => handleSortChange('new')}
                leftSection={<IconArrowBigUpLine style={{ width: rem(14), height: rem(14) }} />}
              >
                News
              </Menu.Item>
              <Menu.Item
                onClick={() => handleSortChange('hot')}
                leftSection={<IconFlame style={{ width: rem(14), height: rem(14) }} />}
              >
                Hot
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={posts.length < (res?.data.total || 0)}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            loader={<div className='text-center'>Loading...</div>}
          >
            {posts.map((post, index) => (
              <ArticleCard
                key={index}
                post={post}
                handleLikePost={handleLikePost}
                handleUnLikePost={handleUnLikePost}
                handleBookmarkPost={handleBookmarkPost}
                handleUnBookmarkPost={handleUnBookmarkPost}
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className=' flex items-center  px-6 py-12 mx-auto'>
          <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='w-16 h-16'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
              <path d='M6 21v-2a4 4 0 0 1 4 -4h3.5' />
              <path d='M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
              <path d='M17 21l4 -4' />
            </svg>
            <h1 className='mt-3 font-semibold text-gray-800 text-3xl'></h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              The current user account is not verify. Please access the email you registered with
              and verify it
            </p>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default HomePage
