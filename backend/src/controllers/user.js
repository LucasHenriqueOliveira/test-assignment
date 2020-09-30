const Helper = require('../helpers/auth');
const UserModel = require("../models/user");
const { body, validationResult } = require("express-validator");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

/**
 * User created.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      telephoneNumber
 * @param {string}      fullAddress
 * @param {string}      ssn
 *
 * @returns {Object}
 */

exports.create = [
	// Validate fields.
	body("firstName").isLength({ min: 1 }).withMessage("First name must be specified."),
	body("lastName").isLength({ min: 1 }).withMessage("Last name must be specified."),
	body("telephoneNumber").isLength({ min: 3 }).trim().withMessage("Telephone number must be specified.")
		.isNumeric().withMessage("Telephone number has non-numeric characters."),
	body("fullAddress").isLength({ min: 1 }).withMessage("Full address must be specified."),
	body("ssn").isLength({ min: 3 }).trim().withMessage("SSN must be specified."),
	
	// Sanitize fields.
	body("firstName").escape(),
	body("lastName").escape(),
	body("telephoneNumber").escape(),
	body("fullAddress").escape(),
	body("ssn").escape(),

	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				
				//hash input ssc
				const hashSSN = Helper.hashPassword(req.body.ssn);

				// Create User object with escaped and trimmed data
				let user = new UserModel(
					{
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						telephoneNumber: req.body.telephoneNumber,
						fullAddress: req.body.fullAddress,
						ssn: hashSSN
					}
				);

				user.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let userData = {
						_id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						telephoneNumber: user.telephoneNumber,
						fullAddress: user.fullAddress
					};
					return apiResponse.successResponseWithData(res, "User added successfully.", userData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User list.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      telephoneNumber
 * @param {string}      fullAddress
 *
 * @returns {Array}
 */
exports.list = [
	// Process request after validation and sanitization.
	(req, res) => {
		try {

			const fields = { _id: 1, firstName: 1, lastName: 1, telephoneNumber: 1, fullAddress: 1 };

			UserModel.find({}, fields).then((users) => {
				if (users.length > 0) {
					return apiResponse.successResponseWithData(res, "Operation success", users);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});

		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
