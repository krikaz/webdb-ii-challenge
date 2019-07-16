const express = require('express');
const app = express();
const db = require('./data/dbConfig.js');

app.use(express.json());

function getAllCars() {
	return db('cars');
}

function createNewCar(car) {
	return db('cars').insert(car);
	// .then(ids => {
	// 	return getById(ids[0]);
	// });
}

app.get('/cars', async (req, res, next) => {
	try {
		const result = await getAllCars();
		res.status(200).json(result);
	} catch (error) {
		res.status(500);
		next(new Error('failed!'));
	}
});

app.post('/cars', async (req, res) => {
	try {
		const newCar = await createNewCar(req.body);
		res.status(201).json(newCar);
	} catch (error) {
		res.status(500);
		next(new Error('failed!'));
	}
});

// app.use((err, req, res, next) => {
// 	console.error('ERROR:', err);
// 	res.status(500).json({
// 		message: err.message,
// 		stack: err.stack,
// 	});
// });

async function validateCar(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		if (req.body.text) {
			next();
		} else {
			res.status(400).json({ message: 'missing required text field' });
		}
	} else {
		res.status(400).json({ message: 'missing post data' });
	}
}

app.listen(4000, () => {
	console.log('listening on 4000');
});
