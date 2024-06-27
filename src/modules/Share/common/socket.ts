import { io } from 'socket.io-client'

const socket = io('https://sentinel-backend.dqh.world')

export default socket
