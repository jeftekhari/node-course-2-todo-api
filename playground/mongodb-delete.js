// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server.');
	const db = client.db('TodoApp');

	// db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	// db.collection('Users').deleteMany({name: 'Joe'}).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID("5a98c85559f328796d00e9ab")
	}).then((result) => {
		console.log(JSON.stringify(result));
	});
	// client.close();
});