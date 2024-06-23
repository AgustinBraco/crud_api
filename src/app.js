// Imports
import './config/env.config.js';
import router from './routes/router.js'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mysql from 'mysql';
import myConnection from 'express-myconnection';

// App
const app = express();
const PORT = app.set('port', process.env.PORT || 3000).settings.port;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// MySQL
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'crud'
}, 'single'));

// Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

router(app);