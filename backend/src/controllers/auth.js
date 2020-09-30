const Helper = require('../helpers/auth');
const AdminModel = require("../models/admin");
const { body, validationResult } = require("express-validator");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

/**
 * Admin registration.
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
 * Admin login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [

	// Validate fields.
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	
	// Sanitize fields.
	body("email").escape(),
	body("password").escape(),

	(req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				AdminModel.findOne({email : req.body.email}).then(user => {
					if (user) {

						//Compare given password with db's hash.
						if (!Helper.comparePassword(req.body.password, user.password)) {
							return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
						}

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
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];