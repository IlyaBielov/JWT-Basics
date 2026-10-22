// базовий клас: errorHandler ловить усіх нащадків через instanceof CustomAPIError
// statusCode тут немає — кидаємо лише підкласи, інакше res.status(undefined)
class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = CustomAPIError
