const express=require('express');
const Router=express.Router();
const controller=require('../controllers/main-controller')
const helper=require('../helper/image')
var verfiyToken=(req,res,next)=>{
    const bearerheader=req.headers.authorization
    

    if(bearerheader){
        const bearer=bearerheader.split(' ');
        const bearerToken=bearer[1];
        
        req.token=bearerToken;
        next();

    }else{
        res.sendStatus(403)
    }



   
}
  

Router.post('/user/register',helper.upload.any('img'),controller.register);
Router.post('/user/login',controller.login);
//Router.get('/',verfiyToken,controller.home) //to get quiezs from frinds shoud only work when login 
Router.post('/user/addfried/:id',verfiyToken,controller.addFriend)
Router.post('/user/acceptfriend/:id',verfiyToken,controller.acceptFriend)
Router.post('/user/getUsers',verfiyToken,controller.getUsers)
//Router.get('/results',controller.quizeResult);














module.exports=Router
