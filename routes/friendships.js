const express=require('express');
const router=express.Router();
const frienshipsController=require('../controllers/friendshipsController');
router.get('/addFriend/:from,:to',frienshipsController.addFriend);
router.get('/acceptRequest/:from,:to',frienshipsController.acceptRequest);
router.get('/removeFriend/:user1,:user2',frienshipsController.removeFriend);
module.exports=router;