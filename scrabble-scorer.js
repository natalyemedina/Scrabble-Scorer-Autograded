// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
//Had to click on actions first
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }
 

// your job is to finish writing these functions and variables that we've named //
// doppn't change the names or your program won't work as expected. //

function initialPrompt() {
   let userWord = input.question("Enter a word to score: ");
   return userWord;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;
   for (const letter of word) {
      score += 1;
   }
   return score;
}

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowels = 'AEIOU';
   let score = 0;
   for (const letter of word) {
      if (vowels.includes(letter)) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
}

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;
   for (const letter of word) {
      score += newPointStructure[letter];
   }
   return score;
}

const scoringAlgorithms = [
   {
      name: 'Simple',
      description: 'One point per character',
      scorerFunction: simpleScorer
   },
   {
      name: 'Vowel Bonus',
      description: 'Vowels are worth 3 points',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'Uses scrabble point system',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let choice = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[Number(choice)];
}

function transform(oldPointStructure) {
   let newStructure = {};
   for (let pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];
      for (let i = 0; i < letters.length; i++) {
         newStructure[letters[i].toLowerCase()] = Number(pointValue);
      }
   }
   return newStructure;
}

function runProgram() {
   console.log("Let's play some Scrabble!\n");
   let userWord = initialPrompt();
   let selectedAlgorithm = scorerPrompt();
   let score = selectedAlgorithm.scorerFunction(userWord);
   console.log(`Score for '${userWord}': ${score}`);  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
