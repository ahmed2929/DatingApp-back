const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var chat=new Schema({
  users:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }],
  messages:[{
     sender:mongoose.Schema.Types.ObjectId,
     mesg:String
  }]




})

module.exports=mongoose.model('chat',chat)