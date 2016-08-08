var game = {
	// Variables
	activeWordList: [],
	currentImage: "",
	guessesRemaining: 10,
	lettersGuessed: "",
	staticWordList: [],
	winCount: 0,
	wordObject: "",
	wordStatus: "",

	// Methods
	checkGuess: function(guess) {
		// Only check guess if input is a letter (uses a regular expression)
		if (/[A-Z]/.test(guess)) {

			// Correct guess?
			if (this.wordObject.word.indexOf(guess) > -1) {
				this.correctGuess(guess);
			} else {
				this.wrongGuess(guess);
			}

			this.updateText();
		}
	},

	correctGuess: function(guess) {
		// Replace all letters that =guess in wordStatus with correct letter
		for (var i = 0; i < this.wordObject.word.length; i++) {
			if (this.wordObject.word.charAt(i) == guess) {
				this.wordStatus = this.wordStatus.substr(0, i) + guess + this.wordStatus.substr(i + 1);
			}
		}

		// Word complete?
		if (this.wordStatus == this.wordObject.word) {
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

	updateText: function() {
		// Update all text fields
		document.getElementById("winCount").innerHTML = this.winCount;
		document.getElementById("wordStatus").innerHTML = this.wordStatus;
		document.getElementById("guessesRemaining").innerHTML = this.guessesRemaining;
		document.getElementById("lettersGuessed").innerHTML = this.lettersGuessed;
	},

	updateImage: function() {
		// Update currentImage (if wordObject.image == null, use default image)
		this.currentImage = this.wordObject.image || "assets/images/hangman/logo.png";

		// Trigger page reflow to re-run image animation (see https://css-tricks.com/restart-css-animation/)
		var image = document.getElementById("currentImage");
		var newImage = image.cloneNode(true);
		image.parentNode.replaceChild(newImage, image);
		newImage.src = this.currentImage;
	},

	newWord: function() {
		debugger;
		var newWordIndex;

		// If active list is empty, refill
		if (this.activeWordList.length < 1) {
			
			// Workaround to prevent .splice() from removing elements from staticWordList
			// Checks to make sure current word(Object) is not added to the new activeWordList
			// emptyOffset prevents a null object in the array
			var emptyOffset = 0;
			for (var i = 0; i < this.staticWordList.length; i++) {
				this.staticWordList[i].word != this.wordObject.word ? 
					this.activeWordList[i - emptyOffset] = this.staticWordList[i] :
					emptyOffset++;
			}
		}

		this.updateImage();

		// Choose new word at random from active list
		var newWordIndex = Math.floor(Math.random() * this.activeWordList.length);
		this.wordObject = this.activeWordList[newWordIndex];

		// Remove new word(Object) from active list
		this.activeWordList.splice(newWordIndex, 1);

		// Reset guessesRemaining, lettersGuessed, wordStatus
		this.guessesRemaining = 10;
		this.lettersGuessed = "<br/>";
		this.wordStatus = this.wordObject.word.replace(/[A-Z]/g, "_");
	},

	initialize: function() {
		this.staticWordList = loadData.data;
		this.newWord();
		this.updateText();
	}
};

// Initialize new game on page load
game.initialize();

// Parse user input
document.onkeyup = function(event){
	var guess = String.fromCharCode(event.keyCode).toUpperCase();
	game.checkGuess(guess);
}