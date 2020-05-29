class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }


    }

    connectionHandler(){
        let self=this;
        

        this.socket.on('connect',function(){
            console.log("Connection Established using sockets..");

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log("A user joined",data);
            });

            $('#send-message-Btn').click(function(e){
                e.preventDefault();

                let newMessage=$('#new-message').val();
                
                if(newMessage!=''){
                    self.socket.emit('send_message',{
                        message:newMessage,
                        user_Email:self.userEmail,
                        chatroom:'codeial'
                    });
                }
            });

            $('#min-max-chatbox-Btn').click(function(e){
                console.log($('#user-chat-box').css('height'));
                if($('#user-chat-box').css('height')=='330px'){
                    console.log($('#user-chat-box').css('height'));
                    $('#user-chat-box').css({
                        'height':'20px',
                        'min-height': '20px',
                        'overflow-y': 'hidden'
                        
                    });

                    $('#new-message-form').css({
                        'position':'static'
                    });
                    $('#min-max-chatbox-Btn').html('maximize');
                }else{
                    console.log($('#user-chat-box').css('height'));
                    $('#user-chat-box').css({
                        'height':'330px',
                        'min-height': '330px',
                        'overflow-y': 'scroll'
                        
                    });
                    $('#new-message-form').css({
                        'position':'fixed'
                    });
                    $('#min-max-chatbox-Btn').html('minimize');
                }
            });
    
            self.socket.on('receive_message',function(data){
                console.log("message received");
                console.log(data.message);
    
                let newMessage=$('<li>');
    
                let messageType='other-messages';
    
                if(data.user_Email == self.userEmail){
                    messageType='my-messages';
                }
    
                newMessage.append($('<span>',{
                    'html':data.message
                }));
    
                newMessage.append($('<h4>',{
                    'html':data.user_Email
                }));
    
                newMessage.addClass(messageType);
    
                $('#messages').append(newMessage);
            });


        });

        


    }
}