const Comment=require('../models/comments');
const Post=require('../models/post');
const Like=require('../models/likes');
const commentsMailer=require('../mailers/comments_mailer');
module.exports.create=async function(req,res){
    try{
        let comment=await Comment.create(req.body);
        let post=await Post.findById(req.body.post);
        post.comments.push(comment);
        post.save();
        await comment.populate('user','name email avatar').execPopulate();
        await post.populate('user','name email').execPopulate();
        commentsMailer.newComment(post,comment); //send post because we will send mail to the post.user
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment,
                    postId:post._id
                },
                message:"New Comment Created!"
            });
        }

      
        
        return res.redirect('back');

    }catch(error){
        console.log("Error:",error);

        req.flash('error',error); 
        return res.redirect('back');

    }
}

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id).populate('post');
        if(comment.user==req.user.id || comment.post.user==req.user.id){
            postId=comment.post._id;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});
            await Like.deleteMany({likeable:req.params.id,onModel:'Comment'});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        commentId:req.params.id
                    },message:"Comment Delete Successfully!"
                });
            }

            //req.flash('success','Comment deleted'); // This was without flash
            return res.redirect('back');
        }else{
            
            req.flash('error','Unauthorized'); 
            return res.redirect('back');
        }

    }catch(error){
        console.log("Error:",error);

        req.flash('error',error); 
        return res.redirect('back');
    }
    
}