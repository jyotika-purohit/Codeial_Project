const express=require('express');
const passport=require('passport');

const router=express.Router();
const likesController=require('../controllers/likesController');
router.get('/toggle/:type,:id',passport.checkAuthentication,likesController.createLike);
module.exports=router;