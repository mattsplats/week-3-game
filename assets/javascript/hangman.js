var game = {
	// "Static" members
	//staticWordList: ["JEDI", "LIGHTSABER", "BLASTER", "DARTH VADER", "MOS EISLEY", "EWOKS", "LANDO CALRISSIAN", "LUKE SKYWALKER", "HAN SOLO", "CHEWBACCA", "DEATH STAR", "TATOOINE", "JABBA THE HUT", "CORUSCANT", "DAGOBAH", "OBI WAN KENOBI", "FORCE", "MILENNIUM FALCON"],
	staticWordList: [{word: "JEDI", image: "http://news.filehippo.com/wp-content/uploads/2014/05/star-wars-funny-1024x576.jpg"},
		{word: "LIGHTSABER", image: "https://i.ytimg.com/vi/p2iUzSjyue0/maxresdefault.jpg"},
		{word: "BLASTER", image: "http://vignette4.wikia.nocookie.net/starwars/images/5/59/Dh-17.jpg/revision/latest?cb=20070224204231"},
		{word: "DARTH VADER", image: "http://img.lum.dolimg.com/v1/images/Darth-Vader_6bda9114.jpeg?region=0%2C23%2C1400%2C785&width=768"}],

	// Variables
	activeWordList: [],
	currentImage: "",
	guessesRemaining: 10,
	lettersGuessed: "",
	winCount: 0,
	word: "",
	wordObject: "",
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

			this.updateText();
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
		var newWordIndex;

		// If active list is empty, refill
		if (this.activeWordList.length < 1) {
			
			// Workaround to prevent .splice() from removing elements from staticWordList
			// Checks to make sure current word(Object) is not added to the new activeWordList
			// emptyOffset prevents a null object in the array
			var emptyOffset = 0;
			for (var i = 0; i < this.staticWordList.length; i++) {
				this.staticWordList[i].word != this.word ? 
					this.activeWordList[i - emptyOffset] = this.staticWordList[i] :
					emptyOffset++;
			}
		}

		this.updateImage();

		// Choose new word at random from active list
		var newWordIndex = Math.floor(Math.random() * this.activeWordList.length);
		this.wordObject = this.activeWordList[newWordIndex];
		this.word = this.wordObject.word;

		// Remove new word(Object) from active list
		this.activeWordList.splice(newWordIndex, 1);

		// Reset guessesRemaining, lettersGuessed, wordStatus
		this.guessesRemaining = 10;
		this.lettersGuessed = "<br/>";
		this.wordStatus = this.word.replace(/[A-Z]/g, "_");
	}
};

// Initialize new game on page load
game.newWord();
game.updateText();

// Parse user input
document.onkeyup = function(event){
	var guess = String.fromCharCode(event.keyCode).toUpperCase();
	game.checkGuess(guess);
}