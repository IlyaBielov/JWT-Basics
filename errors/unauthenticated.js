const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

// 401 — немає токена або він невалідний (не знаємо, хто це)
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED // 401 (назва історична, за змістом — unauthenticated)
  }
}

module.exports = UnauthenticatedError
