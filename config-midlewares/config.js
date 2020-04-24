const express=require('express');
const bodyParser=require('body-parser');

const Routes=require('../routes/route')
const socket=require('../controllers/chat-socket')
module.exports=(app)=>{
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json());


app.use(Routes);

app.use(socket);








    return app;
}