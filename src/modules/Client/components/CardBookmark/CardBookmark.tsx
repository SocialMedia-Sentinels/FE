import { Card, Image, Avatar, Text, Group, ActionIcon } from '@mantine/core'
import { Bookmark } from '../../interfaces'
import { formatDateToReadable } from 'src/modules/Share/utils'
import defaultImage from '../../../Share/assets/images/defaultImagePost.jpg'
import { IconBookmarkOff } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  bookmark: Bookmark
  handleUnBookmarkPost: (post_id: string) => void
}
const CardBookmark = ({ bookmark, handleUnBookmarkPost }: Props) => {
  const navigate = useNavigate()
  const showPost = (post_id: string) => {
    navigate(`/post_detail/${post_id}`)
  }
  return (
    <Card withBorder radius='md' p={0} className='bg-[#413d3d] '>
      <Group gap={0} wrap='nowrap' justify='space-between' className='items-start '>
        <Group
          gap={0}
          wrap='nowrap'
          className='hover:bg-[#000000]/20 w-full hover:cursor-pointer'
          onClick={() => showPost(bookmark._id)}
        >
          {bookmark.medias.length > 0 && bookmark.medias[0].type == 0 ? (
            <Image
              src={bookmark.medias[0].url}
              w={150}
              h={150}
              radius='lg'
              fit='cover'
              className='p-4 rounded-3xl'
            />
          ) : (
            <Image
              src={bookmark.user.avatar || defaultImage}
              w={150}
              h={150}
              radius='lg'
              fit='cover'
              className='p-4 rounded-3xl'
            />
          )}
          <div className='py-4 px-2 '>
            <Text lineClamp={1} className='font-bold leading-5 text-white  my-5'>
              {bookmark.content}
            </Text>
            <Group wrap='nowrap' gap='xs'>
              <Group gap='xs' wrap='nowrap'>
                <Avatar size={20} src={bookmark.user.avatar} />
                <Text size='xs' className='text-white font-Rajdhani'>
                  {bookmark.user.username}
                </Text>
              </Group>
              <Text size='xs' c='dimmed'>
                •
              </Text>
              <Text size='xs' c='dimmed'>
                {formatDateToReadable(bookmark.created_at)}
              </Text>
            </Group>
          </div>
        </Group>
        <ActionIcon
          variant='subtle'
          color='gray'
          className='mx-2 my-2'
          onClick={() => handleUnBookmarkPost(bookmark._id)}
        >
          <IconBookmarkOff stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  )
}

export default CardBookmark
