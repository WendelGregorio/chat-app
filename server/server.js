const app = require("express")();
const server = require('http').createServer(app);
const socket = require('socket.io');

const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

io.on('connection', socket => {
    console.log('[IO] SERVER has a new connection')

    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })

    socket.on('disconnect', () => {
        console.log('[SOCKET] disconnected')
    })
})

server.listen(8080)