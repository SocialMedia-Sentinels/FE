import http from 'src/modules/Share/utils/http'
import { CreateTicketTypeBody } from '../../utils'

const ticketService = {
  createTicket: (body: CreateTicketTypeBody) => http.post('/ticket', body)
}

export default ticketService
