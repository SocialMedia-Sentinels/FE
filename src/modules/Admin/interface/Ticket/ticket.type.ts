export interface TicketsResType {
  message: string
  result: Ticket[]
}
export interface Ticket {
  _id: string
  topic: string
  content: string
  user: UserOfTicket[]
  type: number
  mention: UserOfTicket[]
  created_at: string
  updated_at: string
}
export interface UserOfTicket {
  username: string
  email: string
  avatar: string
  phone_number: string
}
