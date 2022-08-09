import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express()
app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    // need to investigate this stuff further
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    // which user connected?
    console.log('New user connected: ', socket.id);

    socket.on("join_room", (roomID) => {
        socket.join(roomID);
        console.log('User with ID:', socket.id, ' joined room:', roomID)
    })

    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on("disconnect", () => {
        console.log('User disconnected: ', socket.id);
    })
})

server.listen(6001, () => {
    console.log("Server running...")
})