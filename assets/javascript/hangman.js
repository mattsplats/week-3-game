var game = {
	// Persistent variables
	staticWordList: ["jedi", "lightsaber", "blaster", "Darth Vader", "Mos Eisley", "Ewoks", "Lando Calrissian", "Luke Skywalker", "Han Solo", "Chewbacca", "Death Star", "Tatooine", "Jabba the Hut", "Coruscant", "Dagobah", "Obi Wan Kenobi", "force", "Milennium Falcon"]
	winCount: 0,

	// Per-game variables
	activeWordList: [],
	word: "",
	wordStatus: "",
	guessesRemaining: 10;
	lettersGuessed: "";

	// Methods
	newWord: function() {
		var newWordIndex;

		if (activeWordList.length == 0) {
			activeWordList = staticWordList;
		}

		newWordIndex = Math.floor(Math.random() * activeWordList.length);
		activeWordList = activeWordList.splice(newWordIndex, 1);

		this.guessesRemaining = 10;
		this.lettersGuessed = "";

		this.updateDisplay();
	},

	checkGuess: function(guess) {
		if (exp.test())
	},

	updateWordStatus: function() {

	},

	updateDisplay: function() {

	},

	onGuess: function(guess) {
		this.checkGuess(guess);
	}
};

