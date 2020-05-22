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
module.exports=router;