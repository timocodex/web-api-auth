var express = require('express');
var router = express.Router();
var User = require('../controllers/users.controller')
/* GET home page. */
router.get('/',User.show);
router.post('/',User.create);
router.post('/login',User.login)
router.delete('/',User.delete)
router.put('/:id',User.update)
module.exports = router;
