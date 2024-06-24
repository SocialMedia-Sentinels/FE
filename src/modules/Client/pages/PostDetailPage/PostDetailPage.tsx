import { useParams } from 'react-router-dom'
import { DeletePostCommandHandler, GetPostDetailQuery } from '../../services'
import NothingFound from 'src/modules/Share/components/NothingFound'
import { Loader } from '@mantine/core'
import PostDetail from '../../components/PostDetail'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const PostDetailPage = () => {
  const { post_id } = useParams()
  const getPostDetail = new GetPostDetailQuery(post_id as string)
  const postDetail = getPostDetail.fetch()
  const isLoading = getPostDetail.isLoading()
  const deletePostCommandHandler = new DeletePostCommandHandler()
  if (isLoading) {
    return <Loader size='60' className='flex items-center justify-center' />
  }

  return (
    <Fragment>
      <Helmet>
        <title>Post Detail</title>
        <meta name='description' content='This is post detail page of the project' />
      </Helmet>
      <div className='w-full'>
        {postDetail ? (
          <PostDetail post={postDetail[0]} deletePostCommandHandler={deletePostCommandHandler} />
        ) : (
          <NothingFound />
        )}
      </div>
    </Fragment>
  )
}

export default PostDetailPage
