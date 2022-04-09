const user = require('../Tasker_Server/src/helpers/user');

const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = []

//Function to avoid duplicate users while pushing to arraya
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
};
//Function to remove user
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on("connection", (socket) => {
    console.log('a user connected');
    //TAKE USERID AND SOCKETID FROM USER
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    });

    socket.on("disconnect", () => {
        console.log('user removed');
        io.emit('getUsers', users)
        removeUser(socket.id);
    })
})