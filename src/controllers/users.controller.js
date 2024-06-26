import { isInvalidUser } from '../utils/index.js';
import UserDTO from '../dto/user.dto.js';

export const getUsers = async (req, res) => {
  try {
    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search all
      conn.query('SELECT * FROM users', (err, users) => {
        if (err)
          return res.status(500).json({ status: 'Error', error: err.message });

        if (users.length === 0)
          return res.status(404).json({ status: 'Error', error: 'Users not found' });

        // Send users
        return res.status(200).json({ status: 'Success', users });
      });
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by ID
      conn.query(
        'SELECT * FROM users WHERE users.user_id = ?',
        [id],
        (err, user) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });

          if (user.length === 0)
            return res.status(404).json({ status: 'Error', error: 'User not found' });

          // Send user
          return res.status(200).json({ status: 'Success', user });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Get, validate and transform data
    const { id } = req.params;
    const user = req.body;
		const newUser = new UserDTO(user);
    if (isInvalidUser(user))
      return res.status(400).json({ status: 'Error', error: 'Incorrect data submitted' });

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by ID
      conn.query(
        'SELECT * FROM users WHERE users.user_id = ?',
        [id],
        async (err, user) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });
          
					if (user.length === 0)
            return res.status(404).json({ status: 'Error', error: 'User not found' });

          // Update user
          conn.query(
            'UPDATE users SET ? WHERE users.user_id = ?',
            [newUser, id],
            (err, result) => {
              if (err)
                return res.status(500).json({ status: 'Error', error: err.message });

              // Response
              return res.status(200).json({ status: 'Success', message: 'Update successful' });
            },
          );
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by ID
      conn.query(
        'SELECT * FROM users WHERE users.user_id = ?',
        [id],
        async (err, user) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });
					
					if (user.length === 0)
            return res.status(404).json({ status: 'Error', error: 'User not found' });

          // Delete user
          conn.query(
						'DELETE FROM users WHERE users.user_id = ?',
						[id],
						(err, results) => {
              if (err)
                return res.status(500).json({ status: 'Error', error: err.message });

              // Response
              return res.status(200).json({ status: 'Success', message: 'Delete successful' });
            },
          );
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};
