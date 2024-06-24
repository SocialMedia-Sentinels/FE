import http from 'src/modules/Share/utils/http'
import { TicketsResType } from '../interface/Ticket/ticket.type'
import { UsersResType } from '../interface/Users/usermanagement.type'
import { PostsResType } from '../interface/Posts/post.type'

const adminService = {
  getAllUsers: () => http.get<UsersResType>('/admin/users'),

  getAllPosts: () => http.get<PostsResType>('/admin/posts'),

  deletePost: (post_id: string) => http.delete(`/admin/posts/${post_id}`),

  getAllTickets: () => http.get<TicketsResType>('/admin/tickets'),

  banUser: (body: { user_id: string }) => http.post('/admin/ban', body),

  unBanUser: (body: { user_id: string }) => http.post('/admin/unBan', body)
}

export default adminService
