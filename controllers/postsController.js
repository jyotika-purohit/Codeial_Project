const Post=require('../models/post');
module.exports.create=async function(req,res){
    try{
        let post=await Post.create(req.body);
        console.log("New Post Created!");
        return res.redirect('back');
    }catch(error){
        console.log("Error",error);
        return res.redirect('back');
    }
}