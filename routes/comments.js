const passport=require('passport');

const express=require('express');
const router=express.Router();
const commentsController=require('../controllers/commentsController');
router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/delete/:id',passport.checkAuthentication,commentsController.destroy);
module.exports=router;