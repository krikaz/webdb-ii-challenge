const express = require('express');
const app = express();
const db = require('./data/dbConfig.js');

app.use(express.json());

function getAllCars() {
	return db('cars');
}

function createNewCar(car) {
	return db('cars').insert(car);
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

app.post('/cars', validateCar, async (req, res) => {
	try {
		const newCar = await createNewCar(req.body);
		res.status(201).json(newCar);
	} catch (error) {
		res.status(500);
		next(new Error('failed!'));
	}
});

async function validateCar(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		const { VIN, maker, model, mileage } = req.body;
		if (VIN && maker && model && mileage) {
			next();
		} else {
			res.status(400).json({ message: 'missing required field' });
		}
	} else {
		res.status(400).json({ message: 'missing car data' });
	}
}

app.listen(4000, () => {
	console.log('listening on 4000');
});
