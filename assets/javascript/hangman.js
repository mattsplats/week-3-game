var game = {
	// "Static" members
	staticWordList: ["JEDI", "LIGHTSABER", "BLASTER", "DARTH VADER", "MOS EISLEY", "EWOKS", "LANDO CALRISSIAN", "LUKE SKYWALKER", "HAN SOLO", "CHEWBACCA", "DEATH STAR", "TATOOINE", "JABBA THE HUT", "CORUSCANT", "DAGOBAH", "OBI WAN KENOBI", "FORCE", "MILENNIUM FALCON"],

	// Variables
	activeWordList: [],
	guessesRemaining: 10,
	lettersGuessed: "",
	winCount: 0,
	word: "",
	wordStatus: "",

	// Methods
	checkGuess: function(guess) {
		// Only check guess if input is a letter (uses a regular expression)
		if (/[A-Z]/.test(guess)) {

			// Correct guess?
			if (this.word.indexOf(guess) > -1) {
				this.correctGuess(guess);
			} else {
				this.wrongGuess(guess);
			}

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

		// Word complete?
		if (this.wordStatus == this.word) {
			this.winCount++;
			this.newWord();
		}
	},

	wrongGuess: function(guess) {
		// Ignore if the guess has already been made
		if (this.lettersGuessed.indexOf(guess) == -1) {
			
			// Add guess to lettersGuessed (clear newline from wordStatus if first wrong guess)
			if (this.lettersGuessed == "<br/>") {
				this.lettersGuessed = guess;
			} else {
				this.lettersGuessed += ", " + guess;
			}

			// Out of guesses?
			this.guessesRemaining--;
			if (this.guessesRemaining < 1) {
				this.newWord();
			}
		}
	},

	updateDisplay: function() {
		// Update all text fields
		document.getElementById("winCount").innerHTML = this.winCount;
		document.getElementById("wordStatus").innerHTML = this.wordStatus;
		document.getElementById("guessesRemaining").innerHTML = this.guessesRemaining;
		document.getElementById("lettersGuessed").innerHTML = this.lettersGuessed;
	},

	newWord: function() {
		// If active list is empty, refill
		if (this.activeWordList.length < 1) {
			
			// Workaround to prevent .splice() from removing elements from staticWordList
			for (var i = 0; i < this.staticWordList.length; i++) {
				this.activeWordList[i] = this.staticWordList[i];
			}

			// Remove the last word played from active list
			this.activeWordList.splice(this.activeWordList.indexOf(this.word), 1);
		}

		// Choose new word at random from active list
		this.word = this.activeWordList[Math.floor(Math.random() * this.activeWordList.length)];

		// Remove new word from active list
		this.activeWordList.splice(this.activeWordList.indexOf(this.word), 1);

		// Reset guessesRemaining, lettersGuessed, wordStatus
		this.guessesRemaining = 10;
		this.lettersGuessed = "<br/>";
		this.wordStatus = this.word.replace(/[A-Z]/g, "_");
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