var game = {
	// Persistent variables
	staticWordList: ["JEDI", "LIGHTSABER", "BLASTER", "DARTH VADER", "MOS EISLEY", "EWOKS", "LANDO CALRISSIAN", "LUKE SKYWALKER", "HAN SOLO", "CHEWBACCA", "DEATH STAR", "TATOOINE", "JABBA THE HUT", "CORUSCANT", "DAGOBAH", "OBI WAN KENOBI", "FORCE", "MILENNIUM FALCON"],
	winCount: 0,

	// Per-game variables
	activeWordList: [],
	guessesRemaining: 10,
	lettersGuessed: "",
	word: "",
	wordStatus: "",

	// Methods
	checkGuess: function(guess) {
		debugger;

		// Only check guess if input is a letter (uses a regular expression)
		if (/[A-Z]/.test(guess)) {
			debugger;

			// Correct guess?
			if (this.word.indexOf(guess) > -1) {
				this.correctGuess(guess);
			} else {
				this.wrongGuess(guess);
			}
			debugger;

			this.updateDisplay();
		}
	},

	correctGuess: function(guess) {
		// Replace all letters that =guess in wordStatus with correct letter
		for (var i = 0; i < this.word.length; i++) {
			if (this.word.charAt(i) == guess) {
				this.wordStatus = this.wordStatus.substr(0, i) + guess + this.wordStatus.substr(i + 1);
			}
		}
		debugger;

		// Word complete?
		if (this.wordStatus == this.word) {
			this.winCount++;
			this.newWord();
		}
		debugger;
	},

	wrongGuess: function(guess) {
		// Decrement remaining guesses
		this.guessesRemaining--;

		// Add guess to lettersGuessed
		if (this.lettersGuessed == "") {
			this.lettersGuessed += guess;
		} else {
			this.lettersGuessed += ", " + guess;
		}
		debugger;

		// Out of guesses?
		if (this.guessesRemaining < 1) {
			this.newWord();
		}
		debugger;
	},

	updateDisplay: function() {
		var displayWord = "";

		// Create word for display, with added spaces
		for (var i = 0; i < this.wordStatus.length; i++) {
			displayWord += this.wordStatus.charAt(i);
			if (i != this.wordStatus.length - 1) {
				displayWord += "&nbsp;";
			}
		}
		debugger;

		// Update all text fields
		document.getElementById("winCount").innerHTML = this.winCount;
		document.getElementById("displayWord").innerHTML = displayWord;
		document.getElementById("guessesRemaining").innerHTML = this.guessesRemaining;
		document.getElementById("lettersGuessed").innerHTML = this.lettersGuessed;
		debugger;
	},

	newWord: function() {
		var newWordIndex;

		// If active list is empty, refill
		if (this.activeWordList.length < 1) {
			this.activeWordList = this.staticWordList;
			debugger;

			// Remove the last word played from active list
			this.activeWordList.splice(this.activeWordList.indexOf(this.word), 1);
		}
		debugger;

		// Choose new word at random from active list
		newWordIndex = Math.floor(Math.random() * this.activeWordList.length);
		this.word = this.activeWordList[newWordIndex];
		debugger;

		// Remove new word from active list
		this.activeWordList.splice(this.activeWordList.indexOf(this.word), 1);
		debugger;

		// Reset guessesRemaining, lettersGuessed, wordStatus
		this.guessesRemaining = 10;
		this.lettersGuessed = "";
		this.wordStatus = this.word.replace(/[A-Z]/g, "_");
		debugger;
	}
};

// Initialize new game on page load
game.newWord();
game.updateDisplay();

// Parse user input
document.onkeyup = function(event){
	var guess = String.fromCharCode(event.keyCode).toUpperCase();
	game.checkGuess(guess);
}