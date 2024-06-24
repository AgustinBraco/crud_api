export const isAdmin = (req, res, next) => {
  const { permission } = req.session.user;
  if (permission === 'admin') next();
  else return res.status(403).json({ status: 'Error', error: 'Access restricted' });
};
