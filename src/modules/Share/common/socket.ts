import { io } from 'socket.io-client'
import connect from '../constants/connect'

const socket = io(connect.baseUrl)

export default socket
