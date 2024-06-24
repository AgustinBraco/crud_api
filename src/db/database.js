import '../config/environment.js'
import mysql from 'mysql';
import myConnection from 'express-myconnection';

const database = app =>
  app.use(
    myConnection(
      mysql,
      {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
      },
      'single',
    ),
  );

export default database;
