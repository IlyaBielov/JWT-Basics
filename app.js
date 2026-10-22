require('dotenv').config(); // .env → process.env (PORT, згодом JWT_SECRET)
require('express-async-errors'); // помилки з async-контролерів самі йдуть в errorHandler

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public')); // фронтенд: форма логіну + запит до dashboard
app.use(express.json()); // без цього req.body з POST /login буде undefined

app.use('/api/v1', mainRouter); // /dashboard, /login → /api/v1/dashboard, /api/v1/login

// порядок важливий: спершу всі роути, потім 404, error handler — останній
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
