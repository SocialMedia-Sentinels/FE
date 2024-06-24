import { useState } from 'react'
import dayjs from 'dayjs'
import { UnstyledButton, Text, Paper, Group, rem } from '@mantine/core'
import {
  IconChevronDown,
  IconChevronUp,
  IconUsersPlus,
  IconBrandStripe,
  IconTicket
} from '@tabler/icons-react'
import { UserDetail } from '../../interface/Users/usermanagement.type'
import { Ticket } from '../../interface/Ticket/ticket.type'
import { Post } from '../../interface/Posts/post.type'

interface Props {
  users: UserDetail[]
  tickets: Ticket[]
  posts: Post[]
}

const OverviewStatistics = ({ users, posts, tickets }: Props) => {
  const [date, setDate] = useState(new Date())

  const newUsersCount = users.filter((user) => dayjs(user.created_at).isSame(date, 'day')).length

  const newPostsCount = posts.filter((post) => dayjs(post.created_at).isSame(date, 'day')).length

  const newTicketsCount = tickets.filter((ticket) =>
    dayjs(ticket.created_at).isSame(date, 'day')
  ).length

  const stats = [
    { icon: IconUsersPlus, label: 'New Users', data: newUsersCount },
    { icon: IconBrandStripe, label: 'New Posts', data: newPostsCount },
    { icon: IconTicket, label: 'New Ticket', data: newTicketsCount }
  ].map((stat) => (
    <Paper
      className='flex flex-1 flex-col justify-between min-w-[98px] min-h-[140px] p-4 rounded-md shadow-md bg-white'
      key={stat.label}
    >
      <stat.icon
        style={{ width: rem(32), height: rem(32) }}
        className='mx-auto mt-4 text-blue-600'
        stroke={1.5}
      />
      <div>
        <Text className='uppercase font-bold text-xs text-gray-600 text-center'>{stat.label}</Text>
        <Text className='text-xs text-gray-600 text-center'>{stat.data}</Text>
      </div>
    </Paper>
  ))

  return (
    <div className='bg-gradient-to-br from-blue-400 to-blue-700 p-8 rounded-md flex'>
      <div className='flex flex-col mr-8'>
        <UnstyledButton
          className='h-7 w-full text-blue-200 flex justify-center items-center rounded-md transition ease-in-out hover:bg-blue-500 hover:text-white'
          onClick={() => setDate((current) => dayjs(current).add(1, 'day').toDate())}
        >
          <IconChevronUp
            style={{ width: rem(16), height: rem(16) }}
            className='h-4 w-4'
            stroke={1.5}
          />
        </UnstyledButton>

        <div className='flex flex-col justify-center flex-1'>
          <Text className='text-3xl font-bold text-white text-center leading-none mb-1'>
            {dayjs(date).format('DD')}
          </Text>
          <Text className='text-base text-white text-center leading-none'>
            {dayjs(date).format('MMMM')}
          </Text>
        </div>
        <UnstyledButton
          className='h-7 w-full text-blue-200 flex justify-center items-center rounded-md transition ease-in-out hover:bg-blue-500 hover:text-white'
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'day').toDate())}
        >
          <IconChevronDown
            style={{ width: rem(16), height: rem(16) }}
            className='h-4 w-4'
            stroke={1.5}
          />
        </UnstyledButton>
        <Text className='text-3xl text-white text-center leading-none font-bold'>
          {dayjs(date).format('YYYY')}
        </Text>
      </div>

      <Group style={{ flex: 1 }}>{stats}</Group>
    </div>
  )
}

export default OverviewStatistics
