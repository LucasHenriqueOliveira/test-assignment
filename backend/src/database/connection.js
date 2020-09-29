const MongoClient = require('mongodb').MongoClient;
let connectionString = '';
if (!process.env.DB_USER && !process.env.DB_PASSWORD){
    connectionString = process.env.DB_CLIENT + "://" + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE;
} else {
    connectionString = process.env.DB_CLIENT + "://" + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE;
}

module.exports = {

    /* 
    * Mongo Utility: Connect to client */

    clientConnect: async () => (

        await (() => (new Promise((resolve, reject) => (

            MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true },
              (err, client) => {
                resolve(client);
            })
        )
    )))()),

    /* 
    * Mongo Utility: Close client */

    clientClose: async (client) => {
        client.close();
        return true;
    }
};
