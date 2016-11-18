$(document).ready(function(){
//getTableData();
$('#owner-submit').on('click', registerOwner);

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
      getOwners();
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

});
// function getTableData(){
//   $.ajax({
//     type: 'GET',
//     url: '/tableData',
//     success: function(tableData){
//       appendDom(tableData);
//     }
//     error: function(){
//       console.log('Database error');
//     }
//   })
//
// }
// function appendDom(){
//   var dataFromTable = {
//     first_name: jeff
//     last_name: bread
//
//   }
//   $('tableBody').empty();
//   for (var i = 0; i < dataFromTable.length; i++) {
//     $('tableBody').append('<td>test</td>');
//   }
// }
function getOwners(){
  $.ajax({
    type: 'GET',
    url: '/owners',
    success: function(ownersTable){
      nameDropDown(ownersTable);
    }

  })
}
function nameDropDown(ownersTable){
  $('.ownerDrop').empty();

  for (var i = 0; i < ownersTable.length; i++) {
    var firstName = ownersTable[i].first_name;
    var lastName = ownersTable[i].last_name;
    console.log(firstName);
    $('.ownerDrop').append('<option value="'+ ownersTable[i].id +' ">'+ firstName +' '+ lastName+' </option>');
  }

  console.log(ownersTable);
  $('.ownerDrop').change(function(){
    var dropSelect = $(this).val();
    console.log("change drop", dropSelect);

  })
}
