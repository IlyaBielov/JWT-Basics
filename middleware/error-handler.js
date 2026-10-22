const CustomAPIError = require('../errors/custom-error')
// 4 аргументи — саме так Express розпізнає error-middleware
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) { // наша «очікувана» помилка: свій статус і текст
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).send('Something went wrong try again later') // решта — не світимо деталі
}

module.exports = errorHandlerMiddleware
