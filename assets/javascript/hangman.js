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
			this.updateImage();
			this.newWord();
		}
	},

	wrongGuess: function(guess) {
		// Ignore if the guess has already been made
		if (this.lettersGuessed.indexOf(guess) == -1) {

			// Add guess to lettersGuessed object variable
			this.lettersGuessed += guess;

			// If lettersGuessed has 1 or more guesses, add trailing space
			if (this.lettersGuessed.length > 1){
				var spaceSpan = document.createElement("span");
				spaceSpan.innerHTML = "&nbsp;&nbsp;";
				document.getElementById("lettersGuessed").appendChild(spaceSpan);
			}

			// Add guess to lettersGuessed div
			var letterSpan = document.createElement("span");
			letterSpan.innerHTML = guess;
			letterSpan.setAttribute("class", "strikethrough");
			document.getElementById("lettersGuessed").appendChild(letterSpan);

			// Out of guesses?
			this.guessesRemaining--;
			if (this.guessesRemaining < 1) {
				this.updateImage();
				this.newWord();
			}
		}
	},

	updateText: function() {
		// Update all text fields (except lettersGuessed, handled by wrongGuess)
		document.getElementById("winCount").innerHTML = this.winCount;
		document.getElementById("wordStatus").innerHTML = this.wordStatus;
		document.getElementById("guessesRemaining").innerHTML = this.guessesRemaining;
		// document.getElementById("lettersGuessed").innerHTML = this.lettersGuessed;
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

		// Choose new word at random from active list
		newWordIndex = Math.floor(Math.random() * this.activeWordList.length);
		this.wordObject = this.activeWordList[newWordIndex];

		// Remove new word(Object) from active list
		this.activeWordList.splice(newWordIndex, 1);

		// Reset guessesRemaining, lettersGuessed, wordStatus
		this.guessesRemaining = 10;
		this.lettersGuessed = "";
		document.getElementById("lettersGuessed").innerHTML = "";
		this.wordStatus = this.wordObject.word.replace(/[A-Z]/g, "_");
	},

	initialize: function(data) {
		this.staticWordList = data;
		this.newWord();
		this.updateText();
	}
};

// Parse user input
document.onkeyup = function(event){
	var guess = String.fromCharCode(event.keyCode).toUpperCase();
	game.checkGuess(guess);
}

document.getElementById("musicToggle").onclick = function(event){
	var music = document.getElementById("music");

	// Play if paused, pause if playing
	if (music.paused){ music.play(); }
	else { music.pause(); }
}