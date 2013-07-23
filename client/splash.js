loggedIn = function () {

  console.log("Logged in as", Meteor.user());

  gamer = Gamers.findOne({userId: Meteor.userId()});
  console.log("got gamer", gamer);
  Session.set("gamer", gamer);

  player = Session.get("gamer");
  Gamers.update(gamer._id, {$set: {online: true}} ); 

  $('#login').fadeOut();

	
}

Template.splash.events({
	"submit #join": function(event) {
		event.preventDefault();
		form = $(event.target).closest("form");

		username = form.find("[name='username']").val();
		email = form.find("[name='email']").val();
		password = "swag";
		//form.find("[name='password']").val();

		Meteor.loginWithPassword(username, password, function(loginError) {
			if (loginError) {
				console.error("Meteor.loginWithPassword", loginError);
				Accounts.createUser({username: username, email: email, password: password}, function(registerError) { 
					if (registerError) {
						console.error("Accounts.createUser", registerError);
						alert("Bad login details! Please try again.");
					} else {
						Gamers.insert({
							userId: Meteor.userId(), 
							online: false
						});
						return loggedIn();
					}
					
				});
			} else {
				return loggedIn();
			}
				
		});
			
	}

});