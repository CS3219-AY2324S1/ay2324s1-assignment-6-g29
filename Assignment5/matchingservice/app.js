const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000
const axios = require('axios')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

const MatchingService = require('./service/matching')

const matchingService = new MatchingService()

app.use(cors())
app.use(express.json())
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('JoinQueue', async ({ difficulty }, callback) => {
    if (matchingService.isEmpty(difficulty)) {
      console.log(`${socket.id} Joining ${difficulty} Queue`)
      matchingService.joinQueue(difficulty, socket.id)
      setTimeout(() => {
        if (!socket.disconnected) {
          io.to(socket.id).emit('ErrorMatching', { errorMessage: 'Connection Timeout! Please Rejoin Queue' })
          console.log(
          `Disconnecting from ${socket.id} due to 30s passing and no match was found.`
          )
          socket.disconnect()
        }
      }, 30000)
      callback()
    } else {
      const user2socket = socket.id
      const user = matchingService.popQueue(difficulty)
      const user1socket = user.socketid
      if (!user2socket) {
        io.to(socket.id).emit('ErrorMatching', { errorMessage: 'Please Rejoin Queue' })
        callback()
      }
      console.log(`${user2socket} joining room with ${user1socket}`)
      if (user2socket) {
        try {
          io.to(socket.id).emit('MatchingSuccess', { matchedUserId: user1socket })
          io.to(user1socket).emit('MatchingSuccess', { matchedUserId: user2socket })
          callback()
        } catch (error) {
          io.to(user1socket).emit('ErrorMatching', { errorMessage: 'Please Rejoin Queue' })
          io.to(socket.id).emit('ErrorMatching', { errorMessage: 'Please Rejoin Queue' })
        }
      } else {
        io.to(user1socket).emit('ErrorMatching', { errorMessage: 'Please Rejoin Queue' })
        io.to(socket.id).emit('ErrorMatching', { errorMessage: 'Please Rejoin Queue' })
      }
    }
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.id} Leaving Queue`)
    matchingService.leaveQueue(socket.id)
  })
})

server.listen(port, () => console.log(`Express app running on port ${port}!`))
