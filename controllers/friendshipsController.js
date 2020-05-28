const User=require('../models/user');
const Friendships=require('../models/friendships');
const friendRequest_mail=require('../mailers/friendRequest_mailer');

module.exports.addFriend=async function(req,res){
    try{
        let from=await User.findById(req.params.from);
        let to=await User.findById(req.params.to);

        if(!from || !to){
            req.flash('error','Invalid Request');
            return res.redirect('back');
        }
        friendRequest_mail.newRequest(to,from,to.email);
        req.flash('success','Friend Request mail sent!');
        return res.redirect('back');

    }catch(error){
        console.log("Error: ",error);
        return res.redirect('back');
    }
}

module.exports.acceptRequest=async function(req,res){
    try{
        
        let from=await User.findById(req.params.from);
        let to=await User.findById(req.params.to);

        if( !to || !from){
            req.flash('error','Invalid Request');
            return res.redirect('/');
        }

        let newFriendship=await Friendships.create({
            from:from,
            to:to
        });

        await to.friends.push(from);
        await from.friends.push(to);
        to.save();
        from.save();
        
        req.flash('success',`You are now friends !`);
        return res.redirect('/');

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.removeFriend=async function(req,res){
    try{
        let user1=await User.findById(req.params.user1);
        let user2=await User.findById(req.params.user2);

        let request1 =await Friendships.findOne({from:req.params.user1,to:req.params.user2});
        let request2=await Friendships.findOne({from:req.params.user2,to:req.params.user1});
        
        if(request1){
            request=request1
        }else{
            request=request2
        }
        
        let friendship=await Friendships.findById(request._id);
        friendship.remove();
        await User.findByIdAndUpdate(user1,{ $pull:{friends:req.params.user2}});
        await User.findByIdAndUpdate(user2,{ $pull:{friends:req.params.user1}});
        req.flash('success','Done');
        return res.redirect('back');
        

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }

}