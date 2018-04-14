  console.log("Im in the plan.js page")
  // Whenever someone clicks the subscribe
  $("#5plan").on("click", function(event) {
    console.log("Hiiiiii");
    event.preventDefault();
    window.location.href = "/signUp";


    var handler = StripeCheckout.configure({
    	key: 'pk_test_7VhanjfDvmTgkABrbKgoEZpx',
    	image: 'https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    	locale: 'video_stream',
    	token: function (token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    // sends token to backend so payment can be made securely
    //if the response come back without errors then user is routed to
    //success page if err then
    console.log(token);
    $.post("/api/stripeCharge", token).then(function (res) {

      if (res.data) {
        console.log(res)
      }
      else if (res) {
        alert('Ohh no! Somethings wrong with your info or payment please try again.')
      }
    })
  }
});