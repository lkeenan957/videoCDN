module.exports = {
  charge: function (req, res) {
    console.log(req.body)
    // console.log('this is req.body stripe stuf n things', req.body.token.email);
    // console.log('this is req.body session cart n things', req.session);
    var token = req.bodyid
    var email = req.body.email
    var cart = req.session.order

    var total = 0;
    // for (var i = 0; i < cart.length; i++) {
    //     cart[i].total = cart[i].quantity * cart[i].price;
    //     total += cart[i].total;
    // }

    // console.log(total);
    var charge = stripe.charges.create({ //this creats a charge
      amount: 20 * 100, //amount key uses amount in cents, total has no decimals so we *100 to get proper amount
      currency: "usd", //currency excepted
      description: "Example charge",
      source: token, //token generated by stripe is assined to payment
      receipt_email: email //this sends email with order info
    }, function (err, charge) {
      if (err) {
        console.log(err);
        res.json(err)
      } else {
        //this gives us a fresh slate
        req.session.order = [] //if charge then we clear session.order
        req.session.cart = []; //if charge then we clear session.cart
        console.log("VideoCDN");
        const cool = "card was charged"
        res.json(cool) //testing in front end for this string to change view
      }
      // asynchronously called
    });
  },
  updateStripePlanUser: function (req, res, next) {
    req.session.user.currentUser = req.body
    var loggedUser = req.session.user.currentUser;
    if (true) {
      db.User.update({
        plan: loggedUser.plan,
        
      }, {
          where: {
            username: req.params.username
          }
        }).then(function (UserData) {
          res.json(UserData)
        })
    } else {
      res.status(404).json("please log in to update profile")
    }
  }
}
}