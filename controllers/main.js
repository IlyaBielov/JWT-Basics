const CustomAPIError = require('../errors/custom-error');
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  // валідуємо в контролері; альтернатива — Joi або перевірка в Mongoose-схемі
  if (!username || !password) {
    throw new CustomAPIError('Please provide username and password', 400); // throw → errorHandler → 400 { msg }
  }

  const id = new Date().getDate(); // фейковий id для демо — у реальному API він з БД
  // payload лише закодований (base64), не зашифрований — без паролів, мінімум даних
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // формат: "Bearer <token>"
    throw new CustomAPIError('No token provided', 401); // 401 = не автентифікований
  }

  const token = authHeader.split(' ')[1]; // "Bearer abc.def.ghi" → "abc.def.ghi"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // кидає, якщо підпис невалідний або exp минув
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
      msg: `Hello, ${decoded.username}`, // ім'я беремо з перевіреного payload, а не з запиту
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
  } catch (error) { // будь-яку помилку verify перетворюємо на 401, без деталей клієнту
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
}

module.exports = {
  login,
  dashboard,
}
