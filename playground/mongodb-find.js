// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server.');
	const db = client.db('TodoApp');

	
	// db.collection('Users').find({
	// 	_id: new ObjectID('5a98993b0d76ac4ac9a0f961')
	// }).toArray().then((docs) => {
	// 	console.log('Users');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('unable to fetch todos', err);
	// });

	// db.collection('Users').find().count().then((count) => {
	// 	console.log(`Users count: ${count}`);
	// }, (err) => {
	// 	console.log('unable to fetch todos', err);
	// });

	db.collection('Users').find({name: 'Jen'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to find Jen', err);
	});

	// client.close();
});