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

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});

app.use(express.static('./public'));
