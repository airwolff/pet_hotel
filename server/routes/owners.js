<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pet_hotel';


module.exports = router;
=======
function registerOwner() {
  event.preventDefault();

  // owner object will contain owner first name and last name
  var owner = {};

  $.each($('#owner-form').serializeArray(), function (i, field) {
    owner[field.name] = field.value;
  });



  console.log('book: ', book);

  $.ajax({
    type: 'POST',
    url: '/owners',
    data: owner,
    success: function(response) {
      console.log('success on client side')
    },
    error: function() {
      console.log('could not register a new owner');
    }
  })

}
>>>>>>> master
