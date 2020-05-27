const express=require('express');
const router=express.Router();
const likesController=require('../controllers/likesController');
router.get('/toggle/:type,:id',likesController.createLike);
module.exports=router;