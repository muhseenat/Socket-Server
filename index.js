
const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = []

//Function to avoid duplicate users while pushing to array and add user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
};
//Function to remove user when disconnect
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

//Function to get users
const getUser=(userId)=>{
    return users.find(user=>user.userId === userId);
}

io.on("connection", (socket) => {
    console.log('a user connected');
    //TAKE USERID AND SOCKETID FROM USER
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //Send and get messages
    socket.on('sendMessage',({senderId,receiverId,text})=>{
        const user=getUser(receiverId);
        console.log(user,'ithammm paranajyakkinna user');
        io.to(user?.socketId).emit('getMessage',{
            senderId,
            text,
        });
    });


    //When disconnect user
    socket.on("disconnect", () => {
        console.log('user removed');
        io.emit('getUsers', users)
        removeUser(socket.id);
    })
})