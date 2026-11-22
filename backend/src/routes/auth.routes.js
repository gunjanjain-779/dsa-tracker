const router = require('express').Router();
const {register,login,logout,getUserInfo}= require('../controller/auth.controller.js');
const authMiddleware= require('../middleware/auth.middleware.js');
const {validateRegister, validateLogin} = require('../middleware/validate.middleware.js');
router.post('/register',validateRegister,register);
router.post('/login',validateLogin,login);
router.post('/logout',logout);
router.get('/me',authMiddleware, getUserInfo);


module.exports=router;