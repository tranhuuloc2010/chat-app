const express = require('express')
const path = require('path')
const FilterBadWords = require('bad-words')
const {createServer} = require("http");
const {Server} = require("socket.io");

const port = 5000

const app = express()
const httpServer = createServer(app);

const pathPublicDirectory = path.join(__dirname, '../public')
app.use(express.static(pathPublicDirectory))

const io = new Server(httpServer, { /* options */});
// server-side
io.on("connection", (socket) => {
    console.log('Client connected: ' + socket.id);
    /**
     * xu ly cau chao
     * 1. user vua ket noi: chao mung join gruop chat
     * 2. co user moi vua tham gia group
     * **/
    socket.emit('send-message-server-to-client',
        'chao mung join gruop chat'
    )
    // socket.broadcast send all 'Except' this user
    socket.broadcast.emit('send-message-server-to-client',
        'co user moi vua tham gia group')

    // nhan message client
    socket.on('send-message-client-to-server', (messages, callback) => {
        // check bad-words
        const filterBadWord = new FilterBadWords()
        if (filterBadWord.isProfane(messages)) {
            callback('bad-word')
            return
        }
        // gui message ve all client
        io.emit('send-message-server-to-client', messages)

        // xu ly tin nhan thanh cong
        callback()
    })
    socket.on('disconnect', () => {
        console.log('Client disconnect: ' + socket.id);
    })
})

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
