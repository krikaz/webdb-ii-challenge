const express = require('express');
const app = express();
const db = require('../data/dbConfig.js');

function getAllCars() {
	return db('cars');
}

app.use(express.json());

app.get('/', async (req, res, next) => {
	try {
		const result = await getAllCars();
		res.json(result);
	} catch (error) {
		next(new Error('failed!'));
	}
});

app.use((err, req, res, next) => {
	console.error('ERROR:', err);
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
});

app.listen(4000, () => {
	console.log('listening on 4000');
});
