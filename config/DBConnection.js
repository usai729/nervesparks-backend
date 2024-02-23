const { MongoClient } = require('mongodb');
const _ = require('dotenv').config();

const url = process.env.CONN_STR;

async function connectToDatabase() {
	if (!url) throw new Error('No connection string provided');

	try {
		const client = new MongoClient(url);

		await client.connect();

		if (!client) {
			throw new Error("Couldn't connect to database");
		}

		console.log('Connected to db');
		return client;
	} catch (e) {
		throw e;
	}
}

module.exports = connectToDatabase;

/*
nervespark-cluster-1
po4G2kSEYAkEDMyi
*/
