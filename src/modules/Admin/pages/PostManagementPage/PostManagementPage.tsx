import { useQuery } from '@tanstack/react-query'
import adminService from '../../services/admin.service'
import { Fragment, useState } from 'react'
import { Post } from '../../interface/Posts/post.type'
import { chunk } from 'src/modules/Share/constants/enum'
import { Helmet } from 'react-helmet-async'
import { Button, Pagination, Popover, TextInput } from '@mantine/core'
import PostList from '../../components/PostList/PostList'

const PostManagementPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [activePage, setActivePage] = useState(1)
  const [searchUsername, setSearchUsername] = useState('')
  const [searchHashtag, setSearchHashtag] = useState('')

  const { isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => adminService.getAllPosts(),
    keepPreviousData: true,
    onSuccess: (data) => {
      setPosts(data.data.result)
    }
  })
  const filteredPosts = posts.filter((post) => {
    const usernameMatch = searchUsername ? post.user.username.includes(searchUsername) : true
    const hashtagMatch = searchHashtag
      ? post.hashtags.some((hashtag) => hashtag.name.includes(searchHashtag))
      : true
    return usernameMatch && hashtagMatch
  })

  const dataPost = chunk(filteredPosts, 12)

  return (
    <Fragment>
      <Helmet>
        <title>Post Management </title>
        <meta name='description' />
      </Helmet>
      <div className='w-full px-6 py-4'>
        <div className='flex justify-between items-center font-normal relative gap-2 '>
          <Popover width={300} position='right-start' trapFocus withArrow shadow='md'>
            <Popover.Target>
              <Button className='mr-auto bg-[#228BE6] ml-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-4 max-md:h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                  />
                </svg>
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <TextInput
                label='Username'
                placeholder='Username'
                size='xs'
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
              />
              <TextInput
                label='Hashtag'
                placeholder='Hashtag'
                size='xs'
                mt='xs'
                value={searchHashtag}
                onChange={(e) => setSearchHashtag(e.target.value)}
              />
              <div className='flex justify-between mt-6'>
                <Button
                  type='button'
                  className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#da2626] hover:bg-[#da2626] px-4 rounded-lg'
                  onClick={() => {
                    setSearchHashtag('')
                    setSearchUsername('')
                  }}
                >
                  Reset
                </Button>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
        <PostList dataPost={dataPost[activePage - 1]} isLoading={isLoading} />
        <Pagination
          total={dataPost.length}
          value={activePage}
          onChange={setActivePage}
          className='flex justify-center py-4'
          withEdges
        />
      </div>
    </Fragment>
  )
}

export default PostManagementPage
