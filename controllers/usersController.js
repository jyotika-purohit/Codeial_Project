const User=require('../models/user');

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
    if(user){
        try{
            return res.render('profile',{
                title:"Profile Page",
                profileuser:user
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
    let user=await User.findById(req.params.id);
    if(user){
        try{
            if(req.user.id==user.id){
                await User.findByIdAndUpdate(req.params.id,{
                    name:req.body.name,
                    email:req.body.email,
                    age:req.body.age,
                    city:req.body.city
                });
                req.flash('success','Profile Updated!');
                return res.redirect('back');
                
            }else{
                req.flash('error','Unauthorized');
                return res.redirect('back');
            }
            
        }catch(error){
            req.flash('error',error);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized');
        return res.redirect('back');
    }
}