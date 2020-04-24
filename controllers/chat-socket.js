const io=require('../socket.io')
const chat=require('../modles/chat')
const user=require('../modles/user')

module.exports=async (socket)=>{

socket.on('::chat/new-massage/sent',async(data)=>{
    console.log("event fired",data)
    var {chatId,sender,to,mesg}=data;
    var chatRoom=await chat.findOne({_id:chatId});
    console.log(chatRoom)
     chatRoom.messages.push({
         sender:sender,
         mesg:mesg
     })
    chatRoom.save();
    socket.emit(`::chat/new-massage/recive/${to}`,{
        chatId,
        sender,
        to,
        mesg


    })
    




})



}