const Post=require('../models/post');
module.exports.create=async function(req,res){
    try{
        let post=await Post.create(req.body);
        await post.populate('user').execPopulate();
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
        return res.redirect('/users/signin');

    }catch(error){
        console.log("Error",error);
        return res.redirect('back');
    }
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);

        if(req.user.id == post.user){

            post.remove();
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        postId:req.params.id
                    },
                    message:"Post deleted successfully!"
                });
            }
            return res.redirect('back');
        }else{
            console.log("Unauthorized!")
            return res.redirect('back');
        }

    }catch(error){
        console.log("Error:",error);
        return res.redirect('back');
    }
}