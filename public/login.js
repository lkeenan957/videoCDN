$("#loginBtn").on("click", function (event) {
  console.log("clcicked");
  event.preventDefault();
  var user = {
    username: $("#username").val().trim(),
    password: $("#signUpPassword").val().trim()
  }

  $.post("/api/login", user).then(function (response) {
    console.log(response);
    if (!response.error) {
      alert("You have been sign up for video stream");
    } else {
      alert("Error: You details were unable to add to our system!")
    }
  })


})