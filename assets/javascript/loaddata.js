// Immediately sets lower music volume
document.getElementById("music").volume = 0.1;

// Pulls in Google sheets data, calls startGame once data is ready
Tabletop.init(
	{
		key: "https://docs.google.com/spreadsheets/d/1t91WBYfhh9FKVT2IRz8G_1cx8G1EkyfFQlk-AMPFwcQ/pubhtml",
		callback: startGame,
		simpleSheet: true
	});

// Initializes game
function startGame(data) {
	game.initialize(data);
}