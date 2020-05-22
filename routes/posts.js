const passport=require('passport');

const express=require('express');
const router=express.Router();
const postsController=require('../controllers/postsController');
router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/delete/:id',passport.checkAuthentication,postsController.destroy);
module.exports=router;