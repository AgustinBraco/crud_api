import './config/environment.js';
import database from './db/database.js';
import router from './router.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import session from 'express-session';

const app = express();
const PORT = app.set('port', process.env.PORT || 3000).settings.port;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  }),
);

database(app);
router(app);

// Start
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
