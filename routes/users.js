const express=require('express');
const router=express.Router();
const usersController=require('../controllers/usersController');
router.get('/signup',usersController.signup);
router.post('/create',usersController.create);
module.exports=router;