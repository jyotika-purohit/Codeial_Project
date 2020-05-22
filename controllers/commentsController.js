const Comment=require('../models/comments');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        let comment=await Comment.create(req.body);
        let post=await Post.findById(req.body.post);
        post.comments.push(comment);
        post.save();

        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"New Comment Created!"
            });
        }

        return res.redirect('back');

    }catch(error){
        console.log("Error:",error);
        return resizeBy.redirect('back');

    }
}