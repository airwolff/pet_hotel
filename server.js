var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var owners = require('./routes/owners');
var pets = require('./routes/pets');
var visits = require('./routes/visits');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/owners', owners);
app.use('/pets', pets);
app.use('/visits', visits);
