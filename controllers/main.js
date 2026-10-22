const { BadRequestError } = require('../errors');
const jwt = require("jsonwebtoken");
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
  const { username, password } = req.body;

  // валідуємо в контролері; альтернатива — Joi або перевірка в Mongoose-схемі
  if (!username || !password) {
    throw new BadRequestError('Please provide username and password'); // throw → errorHandler → 400 { msg }
  }

  const id = new Date().getDate(); // фейковий id для демо — у реальному API він з БД
  // payload лише закодований (base64), не зашифрований — без паролів, мінімум даних
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.status(StatusCodes.OK).json({ msg: 'user created', token })
}

// сюди доходимо лише після authMiddleware, тож req.user уже є
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(StatusCodes.OK).json({
    msg: `Hello, ${req.user.username}`, // req.user поклав authMiddleware з перевіреного токена
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
