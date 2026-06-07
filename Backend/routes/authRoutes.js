const express = require('express');
const router = express.Router();


const { 
    signup, 
    login, 
    getMe, 
    updateProfile, 
    completeProfile 
} = require('../controllers/authControllers'); 

const { googleLogin } = require('../controllers/googleAuthController');


const { validateSignup, validateLogin } = require('../middlewear/validator');
const { protect } = require('../middlewear/authMiddlewear');


router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.post('/google-login', googleLogin);
router.put('/update-profile', protect, updateProfile);
router.put('/complete-profile', protect, completeProfile);

module.exports = router;