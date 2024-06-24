/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Card, Group, Text } from '@mantine/core'
import { UserSuggestionInfoType } from '../../interfaces'
import { FollowUserCommandHandler } from '../../services'
import { useNavigate } from 'react-router-dom'
interface Props {
  suggestionUser: UserSuggestionInfoType
}
const UserCardImage = ({ suggestionUser }: Props) => {
  const navigate = useNavigate()
  const followUserCommandhandle = new FollowUserCommandHandler(suggestionUser._id)
  const handleFollowUser = () => {
    followUserCommandhandle.handle(
      {},
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }
  const handleClick = (username: string) => {
    navigate(`/profile/${username}`)
  }
  return (
    <Card withBorder padding='xl' radius='md' className='bg-[#242424]'>
      <Card.Section
        className='px-6 pb-6 hover:bg-[#2e2b2b] hover:cursor-pointer'
        onClick={() => handleClick(suggestionUser.username)}
      >
        <Card.Section
          h={140}
          style={{
            backgroundImage: `url(${suggestionUser.cover_photo})`
          }}
        />
        <Avatar
          src={suggestionUser.avatar}
          size={60}
          radius={'md'}
          mx='auto'
          mt={-30}
          className='border-solid border-[2px] border-[#242424]'
        />
        <Text ta='center' fz='lg' fw={500} mt='sm' className='text-white'>
          {suggestionUser.username}
        </Text>
        <Group mt='md' justify='center' gap={30} className='text-white'>
          <div key='Follower'>
            <Text ta='center' fz='lg' fw={500}>
              {suggestionUser.follower.length}
            </Text>
            <Text ta='center' fz='sm' c='dimmed' lh={1}>
              Follower
            </Text>
          </div>
          <div key='Following'>
            <Text ta='center' fz='lg' fw={500}>
              {suggestionUser.following.length}
            </Text>
            <Text ta='center' fz='sm' c='dimmed' lh={1}>
              Following
            </Text>
          </div>
          <div key='Post'>
            <Text ta='center' fz='lg' fw={500}>
              {suggestionUser.posts}
            </Text>
            <Text ta='center' fz='sm' c='dimmed' lh={1}>
              Posts
            </Text>
          </div>
        </Group>
      </Card.Section>

      <Button
        fullWidth
        radius='md'
        mt='md'
        size='md'
        variant='default'
        className='text-white hover:text-white bg-[#2e2e2e] hover:bg-[#3B3B3B] '
        onClick={handleFollowUser}
      >
        Follow
      </Button>
    </Card>
  )
}

export default UserCardImage
