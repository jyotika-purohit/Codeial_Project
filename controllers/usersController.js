const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const accessTokens=require('../models/accessTokens');
const crypto=require('crypto');
const passwordResetMailer=require('../mailers/passwordReset_mailer');
const Friendships=require('../models/friendships');

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup',{
        title:'Codeial | Signup'
    });
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin',{
        title:'Codeial | Signin'
    });
}

module.exports.create=async function(req,res){
    if(req.body.password == req.body.confirmpassword){
        try{
            //check if user with same email id already exists
            let user=await User.findOne({email:req.body.email});
            if(!user){
                user=await User.create(req.body);
                console.log("User Created!")

                req.flash('success','User signup successfull !');
                return res.redirect('/users/signin');
                
            }else{
                console.log("User with this email already exists");
                req.flash('error','User with this email already exists');
                return res.redirect('back');
            }
        }catch(error){
            console.log('error');
            req.flash('error',error);
            return res.redirect('back');

        }
    }else{
        console.log("Password and confirm password do not match");
        req.flash('error','Password and confirm password do not match  ');
        return res.redirect('back');
    }
    
}

module.exports.create_session=function(req,res){
    console.log("Session created!");
    req.flash('success','Signin successfull !');
    return res.redirect('/');
}

module.exports.destroy_session=function(req,res){
    req.logout();
    console.log("User logged out!");
    req.flash('success','You have logged out');
    return res.redirect('/');
}

module.exports.profile=async function(req,res){
    let user = await User.findById(req.params.id);
    
    let isFriend;
    let isFriend1 =await Friendships.findOne({to:req.user._id,from:user._id});
    let isFriend2=await Friendships.findOne({from:req.user._id,to:user._id});
    if(isFriend1 || isFriend2){
        isFriend=true;
    }else{
        isFriend=false;
    }

    if(user){
        try{
            return res.render('profile',{
                title:"Profile Page",
                profileuser:user,
                isFriend:isFriend
            });
        }catch(error){
            req.flash('error',error);
            returnres.redirect('back');
        }

    }else{
        console.log("This user doesn't exists");
        req.flash('error','Unauthorized');
        return res.redirect('back');   
    }
}

module.exports.profile_update=async function(req,res){

    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
         
                User.uploadedAvatar(req,res,function(err){
                    if(err){req.flash('error',error);
                    return res.redirect('back');
                    }
                    user.name=req.body.name,
                    user.email=req.body.email,
                    user.age=req.body.age,
                    user.city=req.body.city
                    if(req.file){

                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
                });
        }catch(error){
            req.flash('error',error);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.redirect('back');
    }
}

module.exports.forgotPasswordPage=function(req,res){
    return res.render("forgotPasswordPage",{
        title:"Forgot Password"
    });
}

module.exports.sendPasswordMail=async function(req,res){
    let user= await User.findOne({email:req.body.email});
    if(user){
        try{
            let token=await accessTokens.create({
                user:user._id,
                accessToken:crypto.randomBytes(20).toString('hex')
            });
            passwordResetMailer.newPasswordMail(req.body.email,token.accessToken);
            
            req.flash('success','Password recovery email sent!');
            return res.redirect('/users/signin');

        }catch(error){
            req.flash('error',error);
            return res.redirect('back');
        }

    }else{
        req.flash('error','No user with this email exists');
        return res.redirect('back');
    }
    
}

module.exports.passwordChangePage=function(req,res){

    return res.render('passwordChangePage',{
        title:"Change Password",
        token:req.params.token
    });
}

module.exports.changePassword=async function(req,res){
    let token=await accessTokens.findOne({accessToken:req.params.token});
    if(token){
        try{
            let user=await User.findById(token.user);

            if(req.body.password==req.body.confirmpassword){
                await User.findByIdAndUpdate(token.user,{
                    password:req.body.password
                });

                req.flash('success','Password Successfully Changed!');
                return res.redirect('/users/signin');
                
            }else{
                req.flash('error','Password and confirm password are not same');
                return res.redirect('back');
            }
            
        }catch(error){
            req.flash('error',error);
            return res.redirect('/');
        }

    }else{
        req.flash('error','Unauthorized');
        return res.redirect('/users/signin');
    }

}