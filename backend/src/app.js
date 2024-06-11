const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const morgan = require('morgan');

const app = express();

app.use(cors({origin: process.env.CORS_ORIGIN}));

app.use(helmet());

app.use(express.json());

app.use(morgan('dev'));

app.post('/login', authController.doLogin);

const settingsRouter = require('./routers/settingsRouter');
app.use('/settings', authMiddleware, settingsRouter);

const clientsRouter = require("./routers/clientsRouter");
app.use("/clients", authMiddleware, clientsRouter);

const productsRouter = require("./routers/productsRouter");
app.use("/products", authMiddleware, productsRouter);

app.post('/logout', authController.doLogout);


app.use(require('./middlewares/errorMiddleware'));

module.exports = app;   