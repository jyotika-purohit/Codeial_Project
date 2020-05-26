const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/usersController');


router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.get('/signout',usersController.destroy_session);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local', 
    { failureRedirect: '/users/signin'}
    ),usersController.create_session);
router.post('/profile-update/:id',passport.checkAuthentication,usersController.profile_update);
router.get('/profile-info/:id',passport.checkAuthentication,usersController.profile);
router.get('/forgot-password',usersController.forgotPasswordPage);
router.post('/getPasswordMail',usersController.sendPasswordMail);
router.get('/reset-password/:token',usersController.passwordChangePage);
router.post('/reset-password/:token',usersController.changePassword);
module.exports=router;