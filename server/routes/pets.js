var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pet_hotel';

router.get('/', function (req, res) {
	console.log('get request');
	// get pets from DB
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT * FROM pets', function (err, result) {
			done();

			if (err) {
				console.log('select query error: ', err);
				res.sendStatus(500);
			}
			res.send(result.rows);
		});
	});
});

router.post('/', function (req, res) {
	console.log("server side POST beginning");
	var newPet = req.body;
	console.log(req);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'INSERT INTO pets (pet_name, pet_breed, pet_color) ' +
			'VALUES ($1, $2, $3)', [newPet.pet_name, newPet.pet_breed, newPet.pet_color],
			function (err, result) {
				done();

				if (err) {
					console.log('insert query error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
	});
});

router.delete('/:id', function (req, res) {
	petID = req.params.id;

	console.log('pet id to delete: ', petID);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM pets WHERE id = $1', [petsID],
			function (err, result) {
				done();

				if (err) {
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	});
});

router.put('/:id', function (req, res) {
	petsID = req.params.id;
	pet = req.body;

	console.log('pet to update ', pet);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'UPDATE pets SET name=$1, breed=$2, color=$3' +
			' WHERE id=$7',
			// array of values to use in the query above
      [pet.name, pet.breed, pet.color, petID],
			function (err, result) {
				if (err) {
					console.log('update error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	});
});

module.exports = router;
