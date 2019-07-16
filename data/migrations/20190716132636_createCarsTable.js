exports.up = function(knex) {
	return knex.schema.createTable('cars', table => {
		table.increments();
		table.integer('VIN', 128);
		table.text('maker', 128);
		table.text('model', 128);
		table.integer('mileage', 128);
		table.text('transmission type', 128);
		table.text('model', 128);
		table.text('status', 128);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('cars');
};
