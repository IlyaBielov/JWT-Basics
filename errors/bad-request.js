const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes') // іменовані константи замість «магічних» чисел

// 400 — клієнт надіслав некоректні дані (напр. немає username/password)
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message) // спершу super: до нього this ще недоступний
    this.statusCode = StatusCodes.BAD_REQUEST // 400; статус «зашитий» у клас — не треба передавати щоразу
  }
}

module.exports = BadRequestError
