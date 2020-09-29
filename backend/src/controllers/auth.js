const Helper = require('../helpers/auth');
const AdminModel = require("../models/admin");
const { body, validationResult } = require("express-validator");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

/**
 * User registration.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

exports.signup = [
	// Validate fields.
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return AdminModel.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	
	// Sanitize fields.
	body("email").escape(),
	body("password").escape(),

	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);

			
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				
				//hash input password
				const hashPassword = Helper.hashPassword(req.body.password);

				// Create User object with escaped and trimmed data
				let admin = new AdminModel(
					{
						email: req.body.email,
						password: hashPassword
					}
				);

				admin.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let adminData = {
						_id: admin._id,
						email: admin.email
					};
					return apiResponse.successResponseWithData(res, "Registration Success.", adminData);
				});

			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),

	(req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				AdminModel.findOne({email : req.body.email}).then(user => {
					if (user) {

						//Compare given password with db's hash.
						Helper.comparePassword(req.body.password, user.password, function (err, same) {
							if (same) {
								let userData = {
									_id: user._id,
									email: user.email,
								};
								
								//Generated JWT token
								userData.authToken = Helper.generateToken(user._id, user.email);

								return apiResponse.successResponseWithData(res,"Login Success.", userData);
							
							} else {
								return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
							}
						});
					} else {
						return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


/*
module.exports = {

	async login(request, response) {
		const { email, password } = request.body;
		const filter = { email : email } ;

		await query("admin", filter).then(user => {
    
    		if (user.length) {
    			if (!Helper.comparePassword(user[0].password, password)) {
	                return response.status(400).json({ error: 'Invalid email or password.' });
	            }

				const token = Helper.generateToken(user[0]._id);

				return response.status(200).json({ authToken: token });
    		} else {
				return response.status(400).json({ error: 'Invalid email or password.' });
    		}
	    
	    }).catch(e => {
	    	return response.status(400).json({ error: 'Error while logging in.' });
	    });
	},

	async signup(request, response) {
		const { email, password } = request.body;
		const filter = { email : email } ;

		console.log(process.env.DB_DATABASE);

		new Promise((resolve, reject) =>(clientConnect().then(client => {
            const items = client.db(process.env.DB_DATABASE).collection("user-admin").find(filter).toArray();
            resolve(items);
			})
		))();

		await query("admin", filter).then(user => {
    
    		if (user.length) {
    			return response.status(400).json({ error: 'Email already registered.' });
    		} else {

    			const hashPassword = Helper.hashPassword(password);

    			const document = {
    				email: email,
    				password: hashPassword,
    				createdOn: new Date()
    			}

    			insert("usuarios", document).then(result => {

					const id = result['insertedId'];
					return response.json({ id });
			    
			    }).catch(e => {
			    	return response.status(400).json({ error: 'Error inserting the user.' });
			    });
    		}
	    
	    }).catch(e => {
	    	return response.status(400).json({ error: 'Error when registering.' });
	    });
	}
};
*/
