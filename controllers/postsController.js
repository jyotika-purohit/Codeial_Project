const Post=require('../models/post');
const Comment=require('../models/comments');
module.exports.create=async function(req,res){
    try{
        let post=await Post.create(req.body);
        await post.populate('user','name email').execPopulate();
        // console.log("Post is :",post);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created Successfully!"
            });
        }
        console.log("new Post data sent!");
        // req.flash('success','Post published!');    //This was for without ajax
        return res.redirect('/users/signin');

    }catch(error){
        console.log("Error",error);

        req.flash('error',error);   
        return res.redirect('back');
    }
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);

        if(req.user.id == post.user){
            
            post.remove();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        postId:req.params.id
                    },
                    message:"Post deleted successfully!"
                });
            }
            // req.flash('success','Post deleted');    //This was for without ajax
            return res.redirect('back');
        }else{
            console.log("Unauthorized!")
            
            req.flash('error','Unauthorized');
            return res.redirect('back');
        }

    }catch(error){
        console.log("Error:",error);
        return res.redirect('back');
    }
}