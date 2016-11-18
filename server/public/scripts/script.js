function registerOwner() {
  event.preventDefault();

  // owner object will contain owner first name and last name
  var owner = {};

  $.each($('#owner-form').serializeArray(), function (i, field) {
    owner[field.name] = field.value;
  });



  console.log('owner: ', owner);

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

$('#add-pet').on('click', registerPets);

function registerPets() {
  event.preventDefault();

  // owner object will contain owner first name and last name
  var pets = {};

  $.each($('#pets-form').serializeArray(), function (i, field) {
    pets[field.name] = field.value;
  });



  console.log('pets: ', pets);

  $.ajax({
    type: 'POST',
    url: '/pets',
    data: pets,
    success: function(response) {
      console.log('success on client side')
    },
    error: function() {
      console.log('could not register a new pet');
    }
  })

}
