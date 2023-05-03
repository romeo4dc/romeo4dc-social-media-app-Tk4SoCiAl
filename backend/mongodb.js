const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1';
const client = new MongoClient(url);

const dbConnect = async () => {
    let result = await client.connect();
    let db = result.db("test");
    return db.collection("newvid");

}
module.exports = dbConnect;