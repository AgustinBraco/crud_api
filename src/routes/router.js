import users from './users.router.js';

// Router -> Router
const router = app => {
  app.use('/users', users);
  app.use('/', (req, res) =>
    res.status(200).json({ status: 'Success', message: 'Server is up!' }),
  );
};

export default router;
