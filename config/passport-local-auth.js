const passport=require('passport');
const User=require('../models/user');
const LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy(
    {usernameField:'email'},
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                return done(err);
            }
            if(!user || user.password != password ){
                return done(null,false);
            }

            return done(null,user);
        });
    }
))

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){return done(err); }

        return done(null,user);
    });
});


//middleware function to check Authentication
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/signin');

}

////req.user contains the current signed in user from the session cookie and we are just sending this to locals for the views

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }

    next();
}

module.exports=passport;
