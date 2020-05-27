const Post=require('../models/post');
const Comment=require('../models/comments');
const Like=require('../models/likes');

module.exports.createLike=async function(req,res){
    // /likes/toggle/type:'xyc',id:'qwe7e2ue'
    try{
        
        let likeable;
        let deleted=false;
        let type=req.params.type;
        if(type=='Post'){
           
            likeable= await Post.findById(req.params.id).populate('likes');
        }else{
            likeable= await Comment.findById(req.params.id).populate('likes');
        }

        let existingLike=await Like.findOne({
            user:req.user._id,
            likeable:req.params.id,  
            onModel:req.params.type
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted=true; //is already liked , so delete like
        }else{
            let newLike= await Like.create({
                user:req.user._id,
                likeable:req.params.id,
                onModel:req.params.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message:"Request successfull!",
            data:{
                deleted:deleted
            }
        });

        // return res.redirect('back');

    }catch(error){
        return res.json(500,{
            message:"Error",error
        });
    }
}