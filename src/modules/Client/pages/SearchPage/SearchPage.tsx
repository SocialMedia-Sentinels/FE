/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from '../../components/ArticleCard'
import { NewFeed } from '../../interfaces/Post'
import { useMutation, useQuery } from '@tanstack/react-query'
import searchService from '../../services/Search/search.service'
import { Button, Loader } from '@mantine/core'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { LikePostCommandHandler } from '../../services/Like'
import likeService from '../../services/Like/like.service'
import bookmarkService from '../../services/Bookmark/bookmark.service'
import { BookmarkPostCommandHandler } from '../../services/Bookmark'

const SearchPage = () => {
  // const getListPostBySearch = new GetListPostBySearchQuery()
  // const posts = getListPostBySearch.fetch()
  const [posts, setPosts] = useState<NewFeed[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const queryParams = new URLSearchParams(location.search)
  const content = queryParams.get('content') || undefined
  const hashtag = queryParams.get('hashtag') || undefined
  const navigate = useNavigate()
  const onClickGoHome = () => {
    navigate(path.home)
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const {
    data: res,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['search', { page: pageNumber, limit: 10 }],
    queryFn: () =>
      searchService.search({ page: pageNumber.toString(), limit: '10', content, hashtag }),
    keepPreviousData: true,
    onSuccess: (data) => {
      setPosts((prevPosts) => [...prevPosts, ...data.data.result])
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    }
  })
  const fetchMoreData = () => {
    setPageNumber((prev) => prev + 1)
  }
  useEffect(() => {
    setPageNumber(1)
    setPosts([])
    refetch()
  }, [content, hashtag, refetch])

  if (isLoading) return <Loader size={50} />

  return (
    <Fragment>
      <Helmet>
        <title>Search</title>
        <meta name='description' content='Search page' />
      </Helmet>
      {!error ? (
        posts.length > 0 ? (
          <div className='px-40 w-full'>
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={posts.length < (res?.data.total || 0)}
              className='!overflow-visible'
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
          <div className='w-full flex items-center flex-wrap justify-center gap-10'>
            <div className='grid gap-4 w-60'>
              <svg
                className='mx-auto'
                xmlns='http://www.w3.org/2000/svg'
                width={168}
                height={164}
                viewBox='0 0 168 164'
                fill='none'
              >
                <g filter='url(#filter0_d_14133_736)'>
                  <path
                    d='M3.99988 81.0083C3.99988 36.7097 39.9078 1 84.0081 1C128.042 1 164 36.6932 164 81.0083C164 99.8046 157.525 117.098 146.657 130.741C131.676 149.653 108.784 161 84.0081 161C59.0675 161 36.3071 149.57 21.3427 130.741C10.4745 117.098 3.99988 99.8046 3.99988 81.0083Z'
                    fill='#F9FAFB'
                  />
                </g>
                <path
                  d='M145.544 77.4619H146.044V76.9619V48.9851C146.044 43.424 141.543 38.9227 135.982 38.9227H67.9223C64.839 38.9227 61.9759 37.3578 60.3174 34.7606L60.3159 34.7583L56.8477 29.3908L56.8472 29.3901C54.9884 26.5237 51.8086 24.7856 48.3848 24.7856H26.4195C20.8584 24.7856 16.3571 29.287 16.3571 34.848V76.9619V77.4619H16.8571H145.544Z'
                  fill='#EEF2FF'
                  stroke='#A5B4FC'
                />
                <path
                  d='M63.9999 26.2856C63.9999 25.7334 64.4476 25.2856 64.9999 25.2856H141.428C143.638 25.2856 145.428 27.0765 145.428 29.2856V33.8571H67.9999C65.7907 33.8571 63.9999 32.0662 63.9999 29.8571V26.2856Z'
                  fill='#A5B4FC'
                />
                <ellipse
                  cx='1.42857'
                  cy='1.42857'
                  rx='1.42857'
                  ry='1.42857'
                  transform='matrix(-1 0 0 1 46.8571 31)'
                  fill='#4F46E5'
                />
                <ellipse
                  cx='1.42857'
                  cy='1.42857'
                  rx='1.42857'
                  ry='1.42857'
                  transform='matrix(-1 0 0 1 38.2859 31)'
                  fill='#4F46E5'
                />
                <ellipse
                  cx='1.42857'
                  cy='1.42857'
                  rx='1.42857'
                  ry='1.42857'
                  transform='matrix(-1 0 0 1 29.7141 31)'
                  fill='#4F46E5'
                />
                <path
                  d='M148.321 126.907L148.321 126.906L160.559 76.3043C162.7 67.5161 156.036 59.0715 147.01 59.0715H14.5902C5.56258 59.0715 -1.08326 67.5168 1.04059 76.3034L1.04064 76.3036L13.2949 126.906C14.9181 133.621 20.9323 138.354 27.8354 138.354H133.764C140.685 138.354 146.681 133.621 148.321 126.907Z'
                  fill='white'
                  stroke='#E5E7EB'
                />
                <path
                  d='M86.3858 109.572C85.2055 109.572 84.2268 108.593 84.2268 107.384C84.2268 102.547 76.9147 102.547 76.9147 107.384C76.9147 108.593 75.9359 109.572 74.7269 109.572C73.5466 109.572 72.5678 108.593 72.5678 107.384C72.5678 96.7899 88.5737 96.8186 88.5737 107.384C88.5737 108.593 87.5949 109.572 86.3858 109.572Z'
                  fill='#4F46E5'
                />
                <path
                  d='M104.954 91.0616H95.9144C94.7053 91.0616 93.7265 90.0829 93.7265 88.8738C93.7265 87.6935 94.7053 86.7147 95.9144 86.7147H104.954C106.163 86.7147 107.141 87.6935 107.141 88.8738C107.141 90.0829 106.163 91.0616 104.954 91.0616Z'
                  fill='#4F46E5'
                />
                <path
                  d='M65.227 91.0613H56.1877C54.9787 91.0613 53.9999 90.0825 53.9999 88.8734C53.9999 87.6931 54.9787 86.7144 56.1877 86.7144H65.227C66.4073 86.7144 67.3861 87.6931 67.3861 88.8734C67.3861 90.0825 66.4073 91.0613 65.227 91.0613Z'
                  fill='#4F46E5'
                />
                <circle cx='142.572' cy={121} r='24.7857' fill='#EEF2FF' stroke='#E5E7EB' />
                <path
                  d='M152.214 130.643L149.535 127.964M150.071 119.928C150.071 115.195 146.234 111.357 141.5 111.357C136.766 111.357 132.928 115.195 132.928 119.928C132.928 124.662 136.766 128.5 141.5 128.5C143.858 128.5 145.993 127.548 147.543 126.007C149.104 124.455 150.071 122.305 150.071 119.928Z'
                  stroke='#4F46E5'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                />
                <defs>
                  <filter
                    id='filter0_d_14133_736'
                    x='1.99988'
                    y={0}
                    width={164}
                    height={164}
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity={0} result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy={1} />
                    <feGaussianBlur stdDeviation={1} />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_14133_736'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_dropShadow_14133_736'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
              <div>
                <h2 className='text-center text-black text-xl font-semibold leading-loose pb-2'>
                  There’s no data here
                </h2>
                <p className='text-center text-black text-base font-normal leading-relaxed pb-4'>
                  Try changing your filters to <br />
                  see appointments{' '}
                </p>
              </div>
            </div>
          </div>
        )
      ) : (
        <section className='relative z-10 bg-primary py-[120px]'>
          <div className='container mx-auto'>
            <div className='-mx-4 flex'>
              <div className='w-full px-4'>
                <div className='mx-auto max-w-[400px] text-center'>
                  <h2 className='mb-2 text-[50px] font-bold leading-none  sm:text-[80px] md:text-[100px]'>
                    404
                  </h2>
                  <h4 className='mb-3 text-[22px] font-semibold leading-tight '>
                    Oops! That page cant be found
                  </h4>
                  <p className='mb-8 text-lg '>The page you are looking for it maybe deleted</p>
                  <Button
                    className='inline-block rounded-lg border border-black px-8 py-3 text-center text-black text-base font-semibold bg-white transition'
                    onClick={onClickGoHome}
                  >
                    Go To Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  )
}

export default SearchPage
