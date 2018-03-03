// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server.');
	const db = client.db('TodoApp');

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5a98b57759f328796d00e73b')
	}, {
		$set: {
			name: 'Joe'
		},
		$inc: {
			age: 3
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5a9992de59f328796d00ea8a')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });
	// client.close();
});