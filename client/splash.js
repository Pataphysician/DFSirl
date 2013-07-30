loggedIn = function () {
  console.log("Logged in as", Meteor.user());

  gamer = Gamers.findOne({userId: Meteor.userId()});
  console.log("got gamer", gamer);
  Session.set("gamer", gamer);

  newGame(6, 4);

  $('#login').fadeOut();
}

getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

newGame = function(width, height) {
	
	saveGame.insert({
		timestamp: Date.now(),
		userId: Meteor.userId(),
		board: {width: width, height: height},
		placement: [{name: "Robin", x: 1, y: getRandomInt(0, height - 2)}, {name: "Skeleton", x: 6, y: getRandomInt(0, height - 2)}, {name: "chest", x: 4, y: 2}],
		win: false

	});

	console.log("sdasd");
	var game = saveGame.find({}, {sort: [["timestamp", "asc"]]});
	Session.set("game", game);
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