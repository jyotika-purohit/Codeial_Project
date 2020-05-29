module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('newConnection received',socket.id); //socket is an object with prop of the user which is sending

        socket.on('disconnect',function(){
            console.log("Socket disconnected!");
        });

        socket.on('join_room',function(data){
            console.log("Joining request",data);

            socket.join(data.chatroom);  //chatroom is 'codeial'
            
            io.in(data.chatroom).emit('user_joined',data);  //user_joined is an event
        });

        socket.on('send_message',function(data) {
            io.in(data.chatroom).emit('receive_message',data);
        });
    });

}