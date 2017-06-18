const express = require('express');
const router = express.Router();
let loginCtrl = require('../controllers/loginCtrl');


router.post('/fblogin',loginCtrl.fblogin);
router.post('/login',loginCtrl.login);
router.post('/register',loginCtrl.register);
module.exports = router;
