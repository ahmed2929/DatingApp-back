let handleChat=require('./controllers/chat-socket')

let io;

module.exports={
    init:(server)=>{
        io=require('socket.io')(server);
        io.on('connection', socket => {
            console.log('Client connected');
           handleChat(socket);
        //     socket.on('chat message',(data)=>{
        //       console.log("listing on test work",data)
        //     })
        //   });
        return server;
        })
    },
    getIo:()=>{
        if(!io){
            throw new Error('socket is not difined')
        }
        return io;
    }
}