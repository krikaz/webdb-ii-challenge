exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('cars')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('cars').insert([
				{ VIN: 100, maker: 'Ford', model: 'Pinto', mileage: 10000 },
				{ VIN: 4567, maker: 'BMW', model: 'Tempo', mileage: 2132 },
				{ VIN: 7874, maker: 'Mercedes', model: 'Punto', mileage: 213 },
				{ VIN: 6787, maker: 'Renault', model: 'Panto', mileage: 658 },
			]);
		});
};
