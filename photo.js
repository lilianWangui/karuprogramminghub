// Listen for the form submission
$('#photo-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the file input element and the selected file
    var fileInput = $('#photo-upload')[0];
    var file = fileInput.files[0];
  
    // Create a new FormData object to send the file to the server
    var formData = new FormData();
    formData.append('photo', file);
  
    // Send the form data to the server using AJAX
    $.ajax({
      url: '/upload-photo',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        // If the upload was successful, display the photo and like button
        $('#photo-container').html(
          '<img src="' + response.url + '" class="img-thumbnail mr-2" width="200" height="200">' +
          '<button class="btn btn-outline-primary like-button"><i class="bi bi-heart"></i> Like</button>'
        );
      },
      error: function(xhr, status, error) {
        // If there was an error, display an error message
        $('#photo-container').html('<p class="text-danger">Error uploading photo: ' + error + '</p>');
      }
    });
  });
  
  // Listen for clicks on the like button
  $('#photo-container').on('click', '.like-button', function() {
    $(this).addClass('liked');
  });
  