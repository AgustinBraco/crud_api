import { isValidPassword, isInvalidUser } from '../utils/index.js';
import UserDTO from '../dto/user.dto.js';

export const registerSession = async (req, res) => {
  try {
    // Get, validate and transform data
    const user = req.body;
		const newUser = new UserDTO(user);
    if (isInvalidUser(user))
      return res.status(400).json({ status: 'Error', error: 'Incorrect data submitted' });

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by email
      conn.query(
        'SELECT email FROM users WHERE email = ?',
        [newUser.email],
        async (err, results) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });
          
					if (results.length > 0)
            return res.status(400).json({ status: 'Error', error: 'User already exists' });

          // Create user
          conn.query('INSERT INTO users SET ?', [newUser], (err, result) => {
            if (err)
              return res.status(500).json({ status: 'Error', error: err.message });

            req.session.user = {
              email: newUser.email,
              permission: newUser.permission
            };

            return res.status(200).json({ status: 'Success', message: 'Register successful' });
          });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const loginSession = async (req, res) => {
  try {
    // Get and validate data
    const user = req.body;
    if (isInvalidUser(user))
      return res.status(400).json({ status: 'Error', error: 'Incorrect data submitted' });

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by email
      conn.query(
        'SELECT * FROM users WHERE email = ?',
        [user.email],
        async (err, result) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });

					if (result.length === 0)
            return res.status(400).json({ status: 'Error', error: 'User not found' });

          if (!isValidPassword(user, result))
            return res.status(403).json({ status: 'Error', error: 'Invalid credentials' });

          req.session.user = {
            email: result[0].email,
            permission: result[0].permission
          };

          return res.status(200).json({ status: 'Success', message: 'Login successful' });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const logoutSession = async (req, res) => {
  try {
    req.session.destroy();
    return res.status(200).json({ status: 'Success', message: 'Logout successful' });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
}

export const currentSession = async (req, res) => {
  try {
    const { email } = req.session.user;
    return res.status(200).json({ status: 'Success', email });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};
