const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var user=new Schema({
name:String,
password:String,
email:String,
imgUrl:String,
gender:String,
friends:[],
pendingRequestTo:[],
myPendingRequest:[],


chat:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'chat'
}]

})

module.exports=mongoose.model('user',user)