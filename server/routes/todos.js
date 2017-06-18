const express = require('express');
const router = express.Router();
let todoCtrl = require('../controllers/todoCtrl');
let loginCtrl = require('../controllers/loginCtrl');

router.use(loginCtrl.checkLogin);

/* GET todos listing. */
router.get('/', todoCtrl.getAllTodo);
router.get('/:id', todoCtrl.getOneTodo);
router.put('/:id', todoCtrl.updateTodo);
router.delete('/:id', todoCtrl.deleteTodo);
router.post('/', todoCtrl.createTodo);

module.exports = router;
