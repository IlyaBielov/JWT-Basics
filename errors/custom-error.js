class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode // errorHandler бере звідси HTTP-статус відповіді
  }
}

module.exports = CustomAPIError
