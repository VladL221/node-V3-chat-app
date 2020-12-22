const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname,'../public')


app.use(express.static(publicDir))


io.on('connection', (socket) =>{
    console.log('New websocket connection!')

    socket.emit('message','Welcome!')

    socket.broadcast.emit('message', 'A new user have joined!')

    socket.on('sendMessage', (msg) => {
        io.emit('message',msg)
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message','A user has left!')
    })
    
})







server.listen(port, ()=>{
    console.log(`Server is up on port! ${port}`)
})