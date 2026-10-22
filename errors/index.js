// barrel: один require('../errors') замість окремого шляху до кожного класу
const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
}
