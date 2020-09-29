
const { clientConnect, clientClose } = require('./connection');
const database = process.env.DB_DATABASE;

module.exports = {
    query: async (collectionName, filter = {}, sort = {}, fields = {}) => (await (() => (
        new Promise((resolve, reject) =>(clientConnect().then(client => {

            const items = client.db(database).collection(collectionName).find(filter).project(fields).sort(sort).toArray();
            resolve(items);
        })
    ))))()),

    list: async (collectionName, filter = {}, arr = {}, filterArr = {}) => (await (() => (
        new Promise((resolve, reject) =>(clientConnect().then(client => {

            const items = client.db(database).collection(collectionName).aggregate([filter, arr, filterArr]).toArray();
            resolve(items);
        })
    ))))()),

    insert: async (collectionName, document) => (await (() => (
        new Promise((resolve, reject) =>(clientConnect().then(client => {

            const result = client.db(database).collection(collectionName).insertOne(document);
            resolve(result);
        })
    ))))()),

};
