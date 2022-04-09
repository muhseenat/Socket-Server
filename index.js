const user = require('../Tasker_Server/src/helpers/user');

const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = []

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId )&&
    users.push({userId,socketId})
};

io.on("connection", (socket) => {
    console.log('a user connected');
    //TAKE USERID AND SOCKETID FROM USER
})