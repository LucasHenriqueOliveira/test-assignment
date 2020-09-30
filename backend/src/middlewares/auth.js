const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const AdminModel = require("../models/admin");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

module.exports = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            return apiResponse.unauthorizedResponse(res, "Token not found!");
        }

        let decoded = await jwt.verify(token, process.env.JWT_SECRET);

        AdminModel.findOne({_id : ObjectId(decoded.id), email: decoded.email}).then((user) => {
            if (!user) {
                return apiResponse.unauthorizedResponse(res, "Invalid token!");
            } else {
                req.user = { id: decoded.id };
                next();
            }
        }).catch (error => {
            return apiResponse.unauthorizedResponse(res, "Token validation incorrect!");
        });
    }
}
