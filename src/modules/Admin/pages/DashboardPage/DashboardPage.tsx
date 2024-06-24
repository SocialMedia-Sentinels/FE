import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import OverviewStatistics from '../../components/OverviewStatistics/OverviewStatistics'
import PostStatistics from '../../components/PostStatistics/PostStatistics'
import DonutTicket from '../../components/DonutTicket/DonutTicket'
import ArticleInteraction from '../../components/ArticleInteraction/ArticleInteraction'
import { UserDetail } from '../../interface/Users/usermanagement.type'
import { useQuery } from '@tanstack/react-query'
import adminService from '../../services/admin.service'
import { Ticket } from '../../interface/Ticket/ticket.type'
import { Post } from '../../interface/Posts/post.type'

const DashboardPage = () => {
  const [users, setUsers] = useState<UserDetail[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  useQuery({
    queryKey: ['users'],
    queryFn: () => adminService.getAllUsers(),
    keepPreviousData: true,
    onSuccess: (data) => {
      setUsers(data.data.result)
    }
  })
  useQuery(['tickets'], () => adminService.getAllTickets(), {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTickets(data.data.result)
    }
  })
  useQuery(['posts'], () => adminService.getAllPosts(), {
    keepPreviousData: true,
    onSuccess: (data) => {
      setPosts(data.data.result)
      setLikes(data.data.likes)
      setComments(data.data.comments)
    }
  })

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='This is dashboard of the project' />
      </Helmet>
      <div className='grid grid-cols-2 gap-12 px-10 py-14'>
        <div className='col-span-1 flex flex-col gap-12 '>
          <OverviewStatistics users={users} posts={posts} tickets={tickets} />
          <PostStatistics posts={posts} />
        </div>

        <div className='col-span-1 flex flex-col gap-12'>
          <ArticleInteraction posts={posts} likes={likes} comments={comments} />
          <DonutTicket tickets={tickets} />
        </div>
      </div>
    </Fragment>
  )
}

export default DashboardPage
