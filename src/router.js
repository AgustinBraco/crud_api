import { sessionsRoute, usersRoute, productsRoute } from './routes/index.js';

// Router -> Route
const router = app => {
  app.use('/sessions', sessionsRoute);
  app.use('/users', usersRoute);
  app.use('/products', productsRoute);
  app.use('/', (req, res) =>
    res.status(200).json({ status: 'Success', message: 'Server is up!' }),
  );
};

export default router;
