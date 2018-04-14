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

      //   var user: {
      //   	username: "ryan",
      //   	plan: "plan"
      //   };

      //   $.put("api/stripeUpdateUser", user).then(function(response){
      //   	console.log(response);
		    // if (!response.error) {
		    //   alert("Your account has been updated with the plan");
		    // } else {
		    //   alert("Error: Your account wasnt updated!")
		    // }
      //   })
      }
      else if (res) {
        alert('Ohh no! Somethings wrong with your info or payment please try again.')
      }
    })
  }
})

//fired off on an ng-click an initiate my stripe api payment form
$("#payPlan").on("click", function () {
	var planPrice = '';
	if(data_name == "5plan"){
		planPrice == 5;
	} else if(data_name == "10plan") {
		planPrice == 10;
	} else {
		planPrice == 100;
	}
  handler.open({
    name: 'VideoCDN',
    email: "lkeenan@ddd.com",
    description: 'Your Purchased' + data_name,
    amount: planPrice * 100
  });
})


// Close Checkout on page navigation: and by clicking form x
window.addEventListener('popstate', function () {
  handler.close();
});