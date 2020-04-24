const mongoose=require('mongoose');
const user=require('../modles/user');
const chat=require('../modles/chat')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var io=require('../socket.io');

var cloudinary=require('../helper/image').cloudinary;


 var register=(req,res)=>{
     console.log('regis fired')
     var salt = bcrypt.genSaltSync(10);
     var hash = bcrypt.hashSync(req.body.password, salt);

          cloudinary.uploader.upload(req.files[0].path,
     function(error, result) {
           //console.log(result) 
           result.url 
           if(error){
           
            res.status(424).json({
                mes:"register failed"
            })
            throw error;


           }

           


           var newUser=new user({
            name:req.body.name,
            password:hash,
           email:req.body.email,
           imgUrl:result.url,
           gender:req.body.gender,

        })
      
       newUser.save()

       newUser.save(function (err) {
                    if (err) return handleError(err);
                     fs.unlinkSync(req.files[0].path)
                     

                     res.status(200);
                     res.json({
                         
                      message:"sucessRegister",
                      user:newUser
                  
                  
                  })



                   });



      // // connect to db 
      
      
      
       
      
          



         }
     );



  

 }

 var login=async(req,res)=>{

// //login logic
 const userR=await user.findOne({email:req.body.email});
 if(userR){
     const result=bcrypt.compareSync(req.body.password,userR.password ); 
     if(result){
       var token=jwt.sign({userR},'AK',{expiresIn:'24h'})
       res.json({login:true,token})

     }else{
         res.json({message:"wrong pass"})
     }


 }else{
     res.json({message:"no user"})
 }




 res.status(200);
 res.json({message:"sucesslogin"})



 }

var getUsers=async(req,res)=>{

    const token=req.token;

jwt.verify(token, 'AK', async function(err, result) {
    if(err) throw err;
    const users=await user.find( {_id:{$ne:result.userR._id} })
    var filterUsers=users.map(user=>{
        var obj={
            name:user.name,
            gender:user.gender,
            ID:user._id,
            userImg:user.img
        }

        return obj;
    })
    res.status(200).json({
        filterUsers
        

    })
    
  })
   
  

 











}

var addFriend=(req,res)=>{
    console.log('add friend fired')
     const token=req.token;
        const ToId=req.params.id;
        console.log(ToId)
      jwt.verify(token, 'AK', async function(err, result) {
          if(err) throw err;
          
          const fromUser=await user.findOne({_id:result.userR._id});
          
           fromUser.pendingRequestTo.push(ToId)
           fromUser.save()


         const toUser=await user.findOne({_id:ToId});
          toUser.myPendingRequest.push(result.userR._id)
          toUser.save()
          
        io.getIo().emit(`newFriend::${ToId}`,{
            user_id:fromUser._id,
            userName:fromUser.name,
            email:fromUser.email

        
        
        })
         
         res.status(200).json({
             mes:'friend req sent ',
             from:fromUser.email,
             to:toUser.email

         })

         })
        




}


var acceptFriend=(req,res)=>{

    const friendID=req.params.id;
    const token=req.token;
    jwt.verify(token, 'AK', async function(err, result) {
        if(err) throw err;
        const room=new chat({
           
        })
        const me=await user.findOne({_id:result.userR._id});
        const addedFriend=await user.findOne({_id:friendID});
            room.users.push(result.userR._id);
            room.users.push(friendID);
            me.friends.push(addedFriend._id);
            me.chat.push(room._id);
           // var index = me.myPendingRequest.indexOf(friendID);
            me.myPendingRequest.remove(friendID)


             //index = addedFriend.pendingRequestTo.indexOf(me._id);
             //temp=addedFriend.pendingRequestTo.splice(index,1);

            addedFriend.pendingRequestTo.remove(result.userR._id);
            addedFriend.friends.push(me._id);
            addedFriend.chat.push(room._id)
             me.save();
            addedFriend.save();
            room.save()
       
       
       
       
        
      
        
        
      io.getIo().emit(`user/friendaccepted::${friendID}`,{
          whoAccepted:me.name

      
      
      })
       
       res.status(200).json({
           mes:'friend req aceepted now you are friends ',
           you:me,
           him:addedFriend

       })

       })
      



}






module.exports={
register,
login,
addFriend,
acceptFriend,
getUsers






}