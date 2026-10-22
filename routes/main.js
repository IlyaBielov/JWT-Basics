const express = require('express');
const router = express.Router();


const { login, dashboard } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

router.route('/dashboard').get(authMiddleware, dashboard); // спершу перевірка токена, потім контролер
router.route('/login').post(login);


module.exports = router;
