const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	completed: false
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

//testing adding Todo!
describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e))
		});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if (err) {
				return done();
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => {
				done(e);
			});
		});
	});
})

//testing get ALL todos
describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});

//testing getbyID
describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		var fakeID = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${fakeID}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 for invalid ID', (done) => {
		request(app)
		.get('/todos/123')
		.expect(404)
		.end(done);
	});
});

//testing delete
describe('/DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var fakeID = todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${fakeID}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(fakeID);
		}).end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.findById(fakeID).then((todo) => {
				expect(todo).toBeFalsy();
				done();
			}).catch((e) => done(e));
		});
	});

	it('should return a 404 if todo not found', (done) => {
		var fakeID = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/${fakeID}`)
		.expect(404)
		.end(done);		
	});

	it('should return 404 if invalid ObjectID', (done) => {
		request(app)
		.delete('/todos/123')
		.expect(404)
		.end(done);
	});
});

//testing update todo!
describe('/PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var fakeID = todos[0]._id.toHexString();
		var newText = 'new text!';

		request(app)
		.patch(`/todos/${fakeID}`)
		.send({
			completed: true,
			text: newText
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(newText);
			expect(res.body.todo.completed).toBe(true);
			expect(typeof res.body.todo.completedAt).toBe('number');
		})
		.end(done);
	});
	it('should clear completedAt when todo is not completed', (done) => {
		var fakeID = todos[1]._id.toHexString();
		var newText = 'even newer text'

		request(app)
		.patch(`/todos/${fakeID}`)
		.send({
			text: newText,
			completed: false
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(newText);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeFalsy();
		})
		.end(done)
	});
});








