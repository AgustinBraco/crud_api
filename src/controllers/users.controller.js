import { isDataInvalid } from '../utils/functions.utils.js'

export const getUsers = async (req, res) => {
	try {
		req.getConnection((err, conn) => {
			// Query to get all elements
			conn.query('SELECT * FROM users;', (err, users) => {
				// Handle error and empty element
				if (err) return res.status(500).json({ status: 'Error', error: err.message });
				if (users.length <= 0) return res.status(404).json({ status: 'Error', message: 'No users found' });

				// Return elements
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

		// Query to get element by ID
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM users WHERE users.user_id = ?', [id], (err, user) => {
				// Handle error and empty element
				if (err) return res.status(500).json({ status: 'Error', error: err.message });
				if (user.length <= 0) return res.status(404).json({ status: 'Error', message: 'No user found' });

				// Return element
				return res.status(200).json({ status: 'Success', user });
			});
		});
	} catch (err) {
		return res.status(500).json({ status: 'Error', error: err.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const data = req.body;
		if (isDataInvalid(data)) return res.status(400).json({ status: 'Error', Error: 'Data is invalid' });

		// Query to insert new element
		req.getConnection((err, conn) => {
			conn.query('INSERT INTO users SET ?', [data], (err, response) => {
				// Handle error and store ID
				if (err) return res.status(500).json({ status: 'Error', error: err.message });
				const id = response.insertId;

				// Query to get element by ID
				conn.query('SELECT * FROM users WHERE users.user_id = ?', [id], (err, user) => {
					// Handle error and empty element
					if (err) return res.status(500).json({ status: 'Error', error: err.message });
					if (user.length <= 0) return res.status(500).json({ status: 'Error', message: 'Internal server error' });

					// Return element
					return res.status(200).json({ status: 'Success', user });
				});
			});

		});
	} catch (err) {
		return res.status(500).json({ status: 'Error', error: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const data = req.body;
		if (isDataInvalid(data)) return res.status(400).json({ status: 'Error', Error: 'Data is invalid' });

		const { id } = req.params;
		const { first_name, last_name, email, phone } = req.body;

		// Query to update element
		req.getConnection((err, conn) => {
			conn.query('UPDATE users SET first_name=?, last_name=?, email=?, phone=? WHERE users.user_id=?', [first_name, last_name, email, phone, id], (err, response) => {
				// Handle error and empty
				if (err) return res.status(500).json({ status: 'Error', error: err.message });
				if (response.affectedRows === 0) return res.status(404).json({ status: 'Error', message: 'No user found' });

				// Query to get element by ID
				conn.query('SELECT * FROM users WHERE users.user_id = ?', [id], (err, user) => {
					// Handle error and empty element
					if (err) return res.status(500).json({ status: 'Error', error: err.message });
					if (user.length <= 0) return res.status(500).json({ status: 'Error', message: 'Internal server error' });

					// Return element
					return res.status(200).json({ status: 'Success', user });
				});
			});

		});
	} catch (err) {
		return res.status(500).json({ status: 'Error', error: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		// Query to delete element
		req.getConnection((err, conn) => {
			conn.query('DELETE FROM users WHERE users.user_id = ?', [id], (err, response) => {
				// Handle error and empty
				if (err) return res.status(500).json({ status: 'Error', error: err.message });
				if (response.affectedRows === 0) return res.status(404).json({ status: 'Error', message: 'No user found' });
				
				// Query to get element by ID
				conn.query('SELECT * FROM users WHERE users.user_id = ?', [id], (err, user) => {
					// Handle error and complete
					if (err) return res.status(500).json({ status: 'Error', error: err.message });
					if (user.length > 0) return res.status(400).json({ status: 'Error', message: 'No user deleted' });

					// Return element
					return res.status(200).json({ status: 'Success', message: 'User deleted' });
				});
			});
		});
	} catch (err) {
		return res.status(500).json({ status: 'Error', error: err.message });
	}
};