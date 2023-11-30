import { Server as NuxtServer } from 'node:http'
import { Socket, Server } from 'socket.io'

export default (nuxtServer: NuxtServer) => {
  const io = new Server(nuxtServer)
  io.on('connection', (socket: Socket) => {
    socket.emit('message', 'Hello World')
  })
}
