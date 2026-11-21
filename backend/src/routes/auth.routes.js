const router = require('express').Router();
const {register,login,logout,getUserInfo}= require('../controller/auth.controller.js');
const authMiddleware= require('../middleware/auth.middleware.js');
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me',authMiddleware, getUserInfo);


module.exports=router;