const Port=3000;
const express=require('express');
const mongoose=require('mongoose');
const configMiddleware=require('./config-midlewares/config');
var app=express();

mongoose.connect('mongodb://localhost/DatingApp',()=>{
    console.log('db connected');

    const server=app.listen(3000);
    require('./socket.io').init(server)
   
     

})



app=configMiddleware(app);







