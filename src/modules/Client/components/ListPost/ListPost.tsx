/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { User } from '../../interfaces'
import FormPost from '../FormPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import { NewFeed } from '../../interfaces/Post'
import { useMutation, useQuery } from '@tanstack/react-query'
import postService from '../../services/Post/post.service'
import ArticleCard from '../ArticleCard'
import { LikePostCommandHandler } from '../../services/Like'
import likeService from '../../services/Like/like.service'
import { BookmarkPostCommandHandler } from '../../services/Bookmark'
import bookmarkService from '../../services/Bookmark/bookmark.service'
import { LoadingOverlay } from '@mantine/core'

interface Props {
  profileUser: User
  isMe: boolean
  username: string | undefined
}

const ListPost = ({ username, isMe, profileUser }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [posts, setPosts] = useState<NewFeed[]>([])
  const [pageNumber, setPageNumber] = useState(1)

  const { data: res, isLoading } = useQuery({
    queryKey: ['my-posts', { page: pageNumber, limit: 10 }],
    queryFn: () =>
      postService.getUserPost(username as string, { page: pageNumber.toString(), limit: '10' }),
    keepPreviousData: true,
    onSuccess: (data) => {
      setPosts((prevPosts) => [...prevPosts, ...data.data.result])
    }
  })
  const fetchMoreData = () => {
    setPageNumber((prev) => prev + 1)
  }

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
  if (isLoading)
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
    )
  return (
    <div className='w-[80%] mx-auto mt-4 relative bg-[#fff] py-8 px-7 rounded-xl shadow-[rgba(94,92,154,.06)_0px_0px_40px_0px]'>
      {isMe && <FormPost profileUser={profileUser} close={close} open={open} opened={opened} />}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={posts.length < (res?.data.total || 0)}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<div>loading...</div>}
        className='!overflow-visible'
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
  )
}

export default ListPost
