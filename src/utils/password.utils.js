import bcrypt from 'bcryptjs';

export const hashPassword = password =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, results) =>
	bcrypt.compareSync(user.password, results[0].password);