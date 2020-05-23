const Comment=require('../models/comments');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        let comment=await Comment.create(req.body);
        let post=await Post.findById(req.body.post);
        post.comments.push(comment);
        post.save();
        await comment.populate('user','name email').execPopulate();
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

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id).populate('post');
        if(comment.user==req.user.id || comment.post.user==req.user.id){
            postId=comment.post._id;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});
            return res.redirect('back');
        }else{
            
            return res.redirect('back');
        }

    }catch(error){
        console.log("Error:",error);
        return;
    }

}