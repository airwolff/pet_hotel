var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pet_hotel';

router.get('/', function (req, res) {
	console.log('get request');
	// get owners from DB
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT * FROM owners', function (err, result) {
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
	var newOwner = req.body;
	console.log(req.body);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'INSERT INTO owners (first_name, last_name) ' +
			'VALUES ($1, $2)', [newOwner.first_name, newOwner.last_name],
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
	ownerID = req.params.id;

	console.log('owner id to delete: ', ownerID);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM owner WHERE id = $1', [ownerID],
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
	ownerID = req.params.id;
	owner = req.body;

	console.log('owner to update ', owner);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'UPDATE owner SET first_name=$1, last_name=$2' +
			' WHERE id=$7',
			// array of values to use in the query above
      [owner.first_name, owner.last_name, ownerID],
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
