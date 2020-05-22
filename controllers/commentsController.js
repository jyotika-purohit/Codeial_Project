const Comment=require('../models/comments');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        let comment=await Comment.create(req.body);
        let post=await Post.findById(req.body.post);
        post.comments.push(comment);
        post.save();
        return res.redirect('back');

    }catch(error){
        console.log("Error:",error);
        return resizeBy.redirect('back');

    }
}