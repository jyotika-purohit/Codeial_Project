module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log('newConnection received',socket.id); //socket is an object with prop of the user which is sending

        socket.on('disconnect',function(){
            console.log("Socket disconnected!");
        })
    })

}