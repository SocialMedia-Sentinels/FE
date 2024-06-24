import { Fragment, useState } from 'react'
import { GetBookMarkByUserIdQuery, UnBookmarkPostCommandHandler } from '../../services/Bookmark'
import { Helmet } from 'react-helmet-async'
import CardBookmark from '../../components/CardBookmark'
import { Loader, Pagination, SimpleGrid } from '@mantine/core'
import NothingFound from 'src/modules/Share/components/NothingFound'
import { chunk } from 'src/modules/Share/constants/enum'
import EmptyStates from 'src/modules/Share/components/EmptyStates/EmptyStates'

const BookmarkPage = () => {
  const getBookmarkByUserId = new GetBookMarkByUserIdQuery()
  const bookmarks = getBookmarkByUserId.fetch()
  const isLoading = getBookmarkByUserId.isLoading()
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
  const [activePage, setActivePage] = useState(1)
  if (isLoading) {
    return <Loader />
  }
  let data
  if (bookmarks) {
    data = chunk(bookmarks, 5)
  }

  let items
  if (data && data.length > 0) {
    items = data[activePage - 1].map((item) => (
      <CardBookmark bookmark={item} key={item._id} handleUnBookmarkPost={handleUnBookmarkPost} />
    ))
  }
  return (
    <Fragment>
      <Helmet>
        <title>Bookmark</title>
        <meta name='description' content='This is bookmark page of the project' />
      </Helmet>
      {bookmarks && bookmarks.length > 0 ? (
        <div className=''>
          {bookmarks ? (
            <SimpleGrid cols={1} w={800}>
              {items}
            </SimpleGrid>
          ) : (
            <NothingFound />
          )}
          <Pagination
            total={data ? data.length : 0}
            value={activePage}
            onChange={setActivePage}
            mt='md'
            className='flex justify-center '
            withEdges
          />
        </div>
      ) : (
        <EmptyStates />
      )}
    </Fragment>
  )
}

export default BookmarkPage
