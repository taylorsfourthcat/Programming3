// Create an empty matrix
var matrix = [];
var numRows = 10;
var numCols = 10;

// Populate the matrix with random values between 0 and 5
for (var y = 0; y < numRows; y++) {
  matrix.push([]);
  for (var x = 0; x < numCols; x++) {
    var randomValue = Math.floor(Math.random() * 6); // randomValue can have values 0, 1, 2, 3, 4, 5
    matrix[y].push(randomValue);
  }
}

var side = 50; // The size of each square in the grid

// Arrays to store different types of characters
var grassArr = [];
var grassArrEater = [];
var frogArr = [];
var snakeArr = [];
var owlArr = [];
var decomposerArr = [];

function setup() {
  createCanvas(numCols * side, numRows * side); // Create a canvas for drawing the grid
  frameRate(5); // Set the frame rate to 5 frames per second
  
  // Populate the character arrays based on the values in the matrix
  for (var y = 0; y < numRows; y++) {
    for (var x = 0; x < numCols; x++) {
      var value = matrix[y][x];
      
      if (value === 1) {
        var gr = new Grass(x, y, 1, Math.round(random(2)));
        grassArr.push(gr);
      } else if (value === 2) {
        genderG = Math.round(random(2));
        var gr = new GrassEater(x, y, 2, genderG); 
        grassArrEater.push(gr);
      } else if (value == 3) {
        var gr = new Frog(x, y, 3, Math.round(random(2)));
        frogArr.push(gr);
      } else if (value == 4) {
        var gr = new Snake(x, y, 4, Math.round(random(2)));
        snakeArr.push(gr);
      } else if (value == 5) {
        var gr = new Owl(x, y, 5, Math.round(random(2)));
        owlArr.push(gr);
      } else if (value == 6) {
        var gr = new Decomposer(x, y, 6, Math.round(random(2)));
        decomposerArr.push(gr);
      }
    }
  }
}

function draw() {
  background('#acacac'); // Set the background color of the canvas

  // Draw the grid based on the values in the matrix
  for (var y = 0; y < numRows; y++) {
    for (var x = 0; x < numCols; x++) {
      var value = matrix[y][x];
      
      if (value == 1) {
        fill("green");
      } else if (value == 2) {
        fill("yellow");
      } else if (value == 3) {
        fill("orange");
      } else if (value == 4) {
        fill("blue");
      } else if (value == 5) {
        fill("purple");
      } else if (value == 6) {
        fill("brown");
      } else {
        fill("#acacac");
      }
      rect(x * side, y * side, side, side); // Draw a rectangle representing each cell in the grid
    }
  }

  // Call the "mul" function for each character in the arrays
for (var i in grassArr) {
  grassArr[i].mul();
}

for (var i in grassArrEater) {
  grassArrEater[i].mul();
}

for (var i in frogArr) {
  frogArr[i].mul();
}

for (var i in snakeArr) {
  snakeArr[i].mul();
}

for (var i in owlArr) {
  owlArr[i].mul();
}

for (var i in grassArrEater) {
  // Check if the energy of the grassArrEater is less than or equal to 0
  if (grassArrEater[i].energy <= 0) {
    grassArrEater[i].die(); // Call the "die" function of the grassArrEater
    grassArrEater[i].freeze(); // Call the "freeze" function of the grassArrEater
  }
}

for (var i in frogArr) {
  // Check if the energy of the frogArr is less than or equal to 0
  if (frogArr[i].energy <= 0) {
    frogArr[i].die(); // Call the "die" function of the frogArr
    frogArr[i].freeze(); // Call the "freeze" function of the frogArr
  }
}


  for (var i in snakeArr) {
    if (snakeArr[i].energy <= 0) {
      snakeArr[i].die();
      snakeArr[i].freeze();
    }
  }
  
  for (var i in owlArr) {
    if (owlArr[i].energy <= 0) {
      owlArr[i].die();
      owlArr[i].freeze();
    }
  }
  
}

window.onload = function() {
  setup();

  // Button click event listeners
  // Add event listeners to the buttons and specify the functions to be executed when clicked
  document.getElementById("radiation").addEventListener("click", radiationButtonClicked);
  document.getElementById("boost").addEventListener("click", boostButtonClicked);
  document.getElementById("removeButton").addEventListener("click", removeButtonClicked);
  document.getElementById("spring").addEventListener("click", springButtonClicked);
  document.getElementById("summer").addEventListener("click", summerButtonClicked);
  document.getElementById("fall").addEventListener("click", autumnButtonClicked);
  document.getElementById("winter").addEventListener("click", winterButtonClicked);

  // Add event listeners to each grassArrEater element
for (let i = 0; i < grassArrEater.length; i++) {
var element = grassArrEater[i];
element.addEventListener("click", grassArrEaterClicked);
}

  // Add event listeners to each frogArr element
  for (let i = 0; i < frogArr.length; i++) {
    frogArr[i].addEventListener("click", frogArrClicked);
  };

  // Add event listeners to each snakeArr element
  for (let i = 0; i < snakeArr.length; i++) {
    snakeArr[i].addEventListener("click",snakeArrClicked);
  };

  // Add event listeners to each owlArr element
  for (let i = 0; i < owlArr.length; i++) {
    owlArr[i].addEventListener("click",owlArrClicked);
  }

  // Start the game loop by calling the draw function continuously every 1000 milliseconds (1 second)
  setInterval(draw, 1000);
};

function eatCharacter(character, characterArray) {
  var index = characterArray.indexOf(character); // Find the index of the character in the array

  if (index !== -1) { // If the character is found in the array
    characterArray.splice(index, 1); // Remove the character from the array using splice
    // The splice method modifies the array by removing the element at the specified index (in this case, 1 element)
  }
}

// Function to handle radiation button click (Implement the rule: a button named radiation that if clicked causes all characters to lose -2 energy. )
const radiationButtonClicked = () => {
  // Loop through grassArrEater array
  for (let i = 0; i < grassArrEater.length; i++) {
    // Check if energy of the current grassArrEater is less than or equal to 0
    if (grassArrEater[i].energy <= 0) {
      // Call the freeze() method of the current grassArrEater
      grassArrEater[i].freeze();
    } else {
      // Reduce the energy of the current grassArrEater by 2
      grassArrEater[i].energy -= 2;
    }
  }
  
  // Loop through frogArr array
  for (let i = 0; i < frogArr.length; i++) {
    // Check if energy of the current frogArr is less than or equal to 0
    if (frogArr[i].energy <= 0) {
      // Call the freeze() method of the current frogArr
      frogArr[i].freeze();
    } else {
      // Reduce the energy of the current frogArr by 2
      frogArr[i].energy -= 2;
    }
  }
  
  // Loop through snakeArr array
  for (let i = 0; i < snakeArr.length; i++) {
    // Check if energy of the current snakeArr is less than or equal to 0
    if (snakeArr[i].energy <= 0) {
      // Call the freeze() method of the current snakeArr
      snakeArr[i].freeze();
    } else {
      // Reduce the energy of the current snakeArr by 2
      snakeArr[i].energy -= 2;
    }
  }
  
  // Loop through owlArr array
  for (let i = 0; i < owlArr.length; i++) {
    // Check if energy of the current owlArr is less than or equal to 0
    if (owlArr[i].energy <= 0) {
      // Call the freeze() method of the current owlArr
      owlArr[i].freeze();
    } else {
      // Reduce the energy of the current owlArr by 2
      owlArr[i].energy -= 2;
    }
  }
};

// Helper functions to handle character clicks (Implement the rule:	If you click on any character (Except the Decomposer) they freeze for 2 seconds and get ill. (Their sickness causes them to lose -1 energy.) Then they continue to move.)
// Function to handle GrassEater character click
const grassArrEaterClicked = () => {
  // Loop through grassArrEater array
  for (let i = 0; i < grassArrEater.length; i++) {
    // Call the freeze() method of the current grassArrEater
    grassArrEater[i].freeze();

    // Set the isIll property of the current grassArrEater to true
    grassArrEater[i].isIll = true;
  }
};


const frogArrClicked = () => {
  for (let i = 0; i < frogArr.length; i++) {
    frogArr[i].freeze();
    frogArr[i].isIll = true;
  }
};

const snakeArrClicked = () => {
  for (let i = 0; i < frogArr.length; i++) {
    snakeArr[i].freeze();
    snakeArr[i].isIll = true;
  }
};

const owlArrClicked = () => {
  for (let i = 0; i < snakeArr.length; i++) {
    owlArr[i].freeze();
    owlArr[i].isIll = true;
  }
};


// Function to handle remove button click
const removeButtonClicked = () => {
  // Loop through decomposerArr array (Implement the rule:  When a character energy goes down to zero, they die then freeze(stop moving), but they don’t disappear. Only the Decomposers eat them.)
  for (let i = 0; i < decomposerArr.length; i++) {
    // Loop through grassArrEater array
    for (let j = 0; j < grassArrEater.length; j++) {
      // Check if the energy of the current grassArrEater is less than or equal to 0
      if (grassArrEater[j].energy <= 0) {
        // Call the eatCharacter function to remove the current grassArrEater from the grassArrEater array
        eatCharacter(grassArrEater[j], grassArrEater);
      }
    }
  
    for (let j = 0; j < frogArr.length; j++) {
      if (frogArr[j].energy <= 0) {
        eatCharacter(frogArr[j], frogArr);
      }
    }
  
    for (let j = 0; j < snakeArr.length; j++) {
      if (snakeArr[j].energy <= 0) {
        eatCharacter(snakeArr[j], snakeArr);
      }
    }
  
    for (let j = 0; j < owlArr.length; j++) {
      if (owlArr[j].energy <= 0) {
        eatCharacter(owlArr[j], owlArr);
      }
    }
  }
  
};


// Function to handle boost button click (implement the rule:a button named boost that if clicked causes all the Frog’s energy to go back to 5.)
const boostButtonClicked = () => {
  // Loop through frogArr array
  for (let i = 0; i < frogArr.length; i++) {
    // Set the energy of the current frog to 5
    frogArr[i].energy = 5;
  }

  // Log a message to the console indicating that the boost button was clicked
  console.log('Boost Button clicked!');
};

//Implement the rule Spring: Characters move faster.
const springButtonClicked = () => {
  // Increase characters' speed
  for (let i = 0; i < grassArrEater.length; i++) {
    grassArrEater[i].speed += 1;
  }

  for (let i = 0; i < frogArr.length; i++) {
    frogArr[i].speed += 1;
  }

  for (let i = 0; i < snakeArr.length; i++) {
    snakeArr[i].speed += 1;
  }

  for (let i = 0; i < owlArr.length; i++) {
    owlArr[i].speed += 1;
  }

  for (let i = 0; i < decomposerArr.length; i++) {
    decomposerArr[i].speed += 1;
  }

  console.log('Spring Button clicked!');
};
//Implement the rule	Autumn: Characters move a bit slower
const autumnButtonClicked = () => {
  // Decrease characters' speed
  for (let i = 0; i < grassArrEater.length; i++) {
    grassArrEater[i].speed -= 1;
  }

  for (let i = 0; i < frogArr.length; i++) {
    frogArr[i].speed -= 1;
  }

  for (let i = 0; i < snakeArr.length; i++) {
    snakeArr[i].speed -= 1;
  }

  for (let i = 0; i < owlArr.length; i++) {
    owlArr[i].speed -= 1;
  }

  console.log('Autumn Button clicked!');
};

//Implement the rule Winter: The Owl falls asleep. It doesnt move.
const winterButtonClicked = () => {
  
  for (let i = 0; i < owlArr.length; i++) {
    owlArr[i].freeze();
  }


  console.log('Winter Button clicked!');
};

//Implement the rule Summer: Characters move faster. Energy is boosted by 1. 
const summerButtonClicked = () => {
  // Increase characters' speed
  for (let i = 0; i < grassArrEater.length; i++) {
    grassArrEater[i].speed += 1;
  }

  for (let i = 0; i < frogArr.length; i++) {
    frogArr[i].speed += 1;
  }

  for (let i = 0; i < snakeArr.length; i++) {
    snakeArr[i].speed += 1;
  }

  for (let i = 0; i < owlArr.length; i++) {
    owlArr[i].speed += 1;
  }

  console.log('Summer Button clicked!');
};

