const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
// 4 аргументи — саме так Express розпізнає error-middleware
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) { // спрацює і для BadRequestError, і для UnauthenticatedError
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later') // решта — не світимо деталі
}

module.exports = errorHandlerMiddleware
