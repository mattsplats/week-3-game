# Hangman Game

### UT Coding Bootcamp Week 3 Homework - Hangman Game

Main game pseudocode:
* Choose a word
  * Load static list and list variable
  * Select at random from variable
  * Remove selected word from variable, do not choose again until list depleted
* Display game status
  * Number of wins
  * Unsolved word
  * Letters guessed
  * Guesses remaining
* Process user input
  * Determine if valid
  * Check against word
  * Letter in word?
    * True: show hidden letter
    * False: add to letters guessed, decrement guesses remaining
  * No guesses remaining OR word complete?
    * New word, clear letters guessed, reset guesses remaining
