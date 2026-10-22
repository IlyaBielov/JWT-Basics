const { UnauthenticatedError } = require('../errors');
const jwt = require("jsonwebtoken");

// завдяки express-async-errors throw тут теж потрапляє в errorHandler
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // формат: "Bearer <token>"
    throw new UnauthenticatedError('No token provided'); // 401 = не автентифікований
  }

  const token = authHeader.split(' ')[1]; // "Bearer abc.def.ghi" → "abc.def.ghi"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // кидає, якщо підпис невалідний або exp минув
    const { id, username } = decoded;
    req.user = { id, username }; // передаємо дані користувача далі — у контролер
    next(); // токен валідний → пускаємо до наступного обробника (dashboard)
  } catch (error) { // будь-яку помилку verify перетворюємо на 401, без деталей клієнту
    throw new UnauthenticatedError('Not authorized to access this route');
  }
}

module.exports = authenticationMiddleware;
