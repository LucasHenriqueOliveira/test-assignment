const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
	 * Hash Password Method
	 * @param {string} password
	 * @returns {string} returns hashed password
	 */
exports.hashPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
	
/**
	 * compare Password
	 * @param {string} hashPassword 
	 * @param {string} password 
	 * @returns {Boolean} return True or False
	 */
exports.comparePassword = function (password, hashPassword) {
	return bcrypt.compareSync(password, hashPassword);
}
	
/**
	 * Generate Token
	 * @param {string} id
	 * @returns {string} token
	 */
exports.generateToken = function (id, email) {
	const token = jwt.sign({
			id: id,
			email: email
		},
		process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_TIME }
	);
	return token;
}

