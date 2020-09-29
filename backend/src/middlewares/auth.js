const jwt = require('jsonwebtoken');
const { query } = require('../database/functions');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
    async verifyToken(req, res, next) {
        const token = req.headers['Authorization'];

        if(!token) {
            return res.status(400).send({ 'message': 'Token not found!' });
        }

        try {
          	const decoded = await jwt.verify(token, global.gConfig.jwtSecret);
            const filter = { _id : ObjectId(decoded.id) } ;

            await query("users", filter).then(rows => {

                if(!rows[0]) {
                    return res.status(400).send({ 'message': 'Invalid token!' });
                }
                req.user = { id: decoded.id };
                next();
              
            }).catch(e => {
                return res.status(400).send({ error: 'Token validation incorrect!' });
            });

        } catch(error) {
          	return res.status(400).send({ error: 'Error checking the token.' });
        }
    }
}
