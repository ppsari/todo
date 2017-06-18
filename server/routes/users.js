const express = require('express');
const router = express.Router();
let userCtrl = require('../controllers/userCtrl');

/* GET users listing. */
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.post('/', userCtrl.createUser);

module.exports = router;
