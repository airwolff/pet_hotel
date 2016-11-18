var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pet_hotel';

router.get('/', function (req, res) {
	console.log('get request');
	// get visitss from DB
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT * FROM visits', function (err, result) {
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
	var newVisits = req.body;
	console.log(req);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'INSERT INTO Visits (check_in_date, check_out_date) ' +
			'VALUES ($1, $2)', [newVisits.check_in_date, newVisits.check_in_date],
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
	visitsID = req.params.id;

	console.log('visits id to delete: ', visitsID);
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM visits WHERE id = $1', [visitsID],
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
	visitsID = req.params.id;
	visits = req.body;

	console.log('visits to update ', visits);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'UPDATE visits SET first_name=$1, last_name=$2' +
			' WHERE id=$7',
			// array of values to use in the query above
      [visits.first_name, visits.last_name, visitsID],
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
