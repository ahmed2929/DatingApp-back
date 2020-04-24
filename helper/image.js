const express=require('express');
const fs=require('fs');
const path=require('path')
const Router=express.Router();
const multer=require('multer')


var cloudinary = require('cloudinary').v2;
//put ur config
cloudinary.config({ 
    cloud_name: 'dzxdrtfbw', 
    api_key: '512788788339421', 
    api_secret: 'RCiIvFPr9ATumrqK8-SjQfYOrLU' 
  });


var storage=multer.diskStorage({
destination:(req,file,cb)=>{
    cb(null,'uploads/images')
},
filename:(req,file,cb)=>{
cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))



}



})

var checkImage=function(file,cb){


var ext=path.extname(file.originalname);

if(ext==='.png'||ext==='.jpg'||ext==='.jpeg'){
    cb(null,true)
}else{
    cb('not an image',false)
}


}


var upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        checkImage(file,cb)
    }
})



// Router.post('/upload',upload.any('img'),(req,res)=>{

//     cloudinary.uploader.upload(req.files[0].path,
//      function(error, result) {
//           //console.log(result) 
//           var img = new image({ url: result.url });
//           img.save(function (err) {
//             if (err) return handleError(err);
//             fs.unlinkSync(req.files[0].path)
//             res.json({message:"image saved",url:result.url})
//           });
          



//         }
//      );





// })

module.exports={
    upload,
    cloudinary


}