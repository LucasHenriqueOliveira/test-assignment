const { query, insert } = require('../database/functions');
const ObjectId = require('mongodb').ObjectID;

module.exports = {

	async index(request, response) {
		const filter = { } ;
		const sort = { firstName : 1 } ;
		const fields = { _id: 1, firstName: 1, lastName: 1, telephoneNumber: 1, fullAddress: 1 };

		await query("users", filter, sort, fields).then(users => {

    		return response.json(users);
	    
	    }).catch(e => {
	    	return response.status(400).json({ error: 'Error listing users.' });
	    });
	},

	
	async create(request, response) {
		const document = request.body;
        
        if(!document.firstName || !document.lastName || !document.telephoneNumber || !document.ssn || !document.fullAddress) {
            return response.status(400).json({ error: 'Error inserting the user.' });
        }

        document.createdOn = new Date();
        await insert("users", document).then(result => {

            const id = result['insertedId'];
            return response.json({ id });
        
        }).catch(e => {
            return response.status(400).json({ error: 'Error inserting the user.' });
        });
	},

};
