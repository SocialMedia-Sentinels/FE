import { Loader, Modal, ScrollArea } from '@mantine/core'
import { Post } from '../../interface/Posts/post.type'
import NoRecord from 'src/modules/Share/components/NoRecord/NoRecord'
import CardPost from '../CardPost/CardPost'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import ModalPostDetail from '../ModalPostDetail/ModalPostDetail'

interface Props {
  dataPost: Post[]
  isLoading: boolean
}
const PostList = ({ dataPost }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const handleCardClick = (post: Post) => {
    setSelectedPost(post)
    open()
  }
  const listCard = dataPost?.map((post) => (
    <CardPost post={post} key={post._id} onClick={() => handleCardClick(post)} />
  ))

  return (
    <div>
      <ScrollArea className='w-full px-4 py-4'>
        {dataPost && dataPost.length > 0 ? (
          <div className='grid grid-cols-3 gap-20'>{listCard}</div>
        ) : (
          <NoRecord />
        )}
      </ScrollArea>
      <Modal size='1000' opened={opened} onClose={close} title='Post' centered>
        <div>
          {selectedPost ? (
            <ModalPostDetail post={selectedPost} onClose={close} />
          ) : (
            <Loader size='80' />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default PostList
