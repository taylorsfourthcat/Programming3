class LivingCreature {
    constructor(x, y, index, gender) {
      this.x = x; // x-coordinate of the creature
      this.y = y; // y-coordinate of the creature
      this.index = index; // unique index of the creature
      this.gender = gender; // gender of the creature
      this.multiply = 0; // counter for reproduction
      this.directions = [ // array of neighboring coordinates
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
      ];
    }
  
    // Returns an array of coordinates of neighboring cells that contain the given character
    chooseCell(character) {
      var found = [];
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
  
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[y][x] == character) {
            found.push(this.directions[i]);
          }
        }
      }
      return found;
    }
  }
  
  class Grass extends LivingCreature {
    mul() {
      this.multiply++;
      var newCell = random(this.chooseCell(0));
      console.log(newCell, this.multiply);
      if (this.multiply >= 8 && newCell) {
        var newGrass = new Grass(newCell[0], newCell[1], this.index);
        grassArr.push(newGrass);
        matrix[newCell[1]][newCell[0]] = 1;
        this.multiply = 0;
      }
    }
  }
  
  class GrassEater extends LivingCreature {
    constructor(x, y, index, gender) {
      super(x, y, index, gender);
      this.energy = 5; // energy level of the GrassEater
      this.isIll = false; // flag indicating if the GrassEater is ill
      this.speed = 1; // movement speed of the GrassEater
      this.isFrozen = false; // flag indicating if the GrassEater is frozen
    }
  
    // Updates the array of neighboring coordinates
    getNewCoordinates() {
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
      ];
    }
  
    // Overrides the chooseCell method to update the coordinates and call the parent's chooseCell method
    chooseCell(character) {
      this.getNewCoordinates();
      return super.chooseCell(character);
    }
  
    // Moves the GrassEater to an empty neighboring cell
    moveh() {
      this.getNewCoordinates();
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
      console.log(emptyCells);
  
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
      }
    }
  
    // Moves the GrassEater based on its state (ill or not)
    move() {
      if (this.isFrozen) {
        return; // If frozen, do not move
      }
  
      if (this.isIll) {
        this.energy -= 1;
        if (this.energy <= 0) {
          this.die();
          return;
        }
        setTimeout(() => {
          this.moveh();
          this.isIll = false;
        }, 2000); // Move after 2 seconds and remove the illness flag
      } else {
        this.moveh(); // Move normally
      }
    }
  
    // Eats grass from a neighboring cell or moves if no grass is available
    eath() {
      this.getNewCoordinates();
      var grassCells = this.chooseCell(1);
      var newCell = random(grassCells);
      console.log(grassCells);
  
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        this.energy++;
        for (var i in grassArr) {
          if (newX == grassArr[i].x && newY == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
      } else {
        this.energy--;
        this.move();
      }
      if (this.energy <= 0) {
        this.die();
      }
    }
  
    // Eats grass based on its state (ill or not)
    eat() {
      if (this.isFrozen) {
        return; // If frozen, do not eat
      }
  
      if (this.isIll) {
        this.energy -= 1;
        if (this.energy <= 0) {
          this.die();
          return;
        }
        setTimeout(() => {
          this.eath();
          this.isIll = false;
        }, 2000); // Eat after 2 seconds and remove the illness flag
      } else {
        this.eath(); // Eat normally
      }
    }
  
    // Freezes the GrassEater for 5 seconds
    freeze() {
      this.isFrozen = true;
      setTimeout(() => {
        this.isFrozen = false;
      }, 5000);
    }
  
    // Reproduces if energy is sufficient or eats if not
    mul() {
      this.getNewCoordinates();
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
      console.log(emptyCells);
  
      if (newCell && this.energy >= 5) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;
        var newGrassEater = new GrassEater(newX, newY, 2);
        grassArrEater.push(newGrassEater);
        this.energy = 2;
      } else {
        this.eat();
      }
    }
  
    // Removes the GrassEater from the matrix and the array
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in grassArrEater) {
        if (this.x == grassArrEater[i].x && this.y == grassArrEater[i].y) {
          grassArrEater.splice(i, 1);
          break;
        }
      }
    }
  }
  

  class Frog {
    constructor(x, y, index, gender) {
        this.x = x; // x-coordinate of the frog
        this.y = y; // y-coordinate of the frog
        this.energy = 5; // energy level of the frog
        this.speed = 1; // speed of the frog
        this.index = index; // index of the frog
        this.gender = gender; // gender of the frog
        this.directions = []; // possible movement directions of the frog
        this.isIll = false; // flag indicating if the frog is ill
        this.isFrozen = false; // flag indicating if the frog is frozen
    }

    getNewCoordinates() {
        // Set the possible movement directions for the frog
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            // Check if the coordinates are within the matrix boundaries
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                // Check if the character at the coordinates matches the provided character
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    moveh() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0); // Get empty cells around the frog
        var newCell = random(emptyCells); // Choose a random empty cell
        console.log(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3; // Set the frog's index at the new coordinates in the matrix
            matrix[this.y][this.x] = 0; // Set the current coordinates in the matrix as empty

            this.x = newX; // Update the frog's x-coordinate
            this.y = newY; // Update the frog's y-coordinate
        }
    }

    move() {
        if (this.isFrozen) {
            return; // If the frog is frozen, do not move
        }

        if (this.isIll) {
            this.energy -= 1; // Decrease energy level by 1
            if (this.energy <= 0) {
                this.die(); // If energy level is zero or below, the frog dies
                return;
            }
            setTimeout(() => {
                this.moveh(); // Move the frog to a new cell
                this.isIll = false; // Set the illness flag to false
            }, 2000); // Delay the movement for 2 seconds (simulating illness)
        } else {
            this.moveh(); // Move the frog to a new cell
        }
    }

    eath() {
        this.getNewCoordinates();
        var eaterCells = this.chooseCell(2); // Get cells with grass eaters around the frog
        var newCell = random(eaterCells); // Choose a random cell with a grass eater
        console.log(eaterCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3; // Set the frog's index at the new coordinates in the matrix
            matrix[this.y][this.x] = 0; // Set the current coordinates in the matrix as empty

            this.x = newX; // Update the frog's x-coordinate
            this.y = newY; // Update the frog's y-coordinate
            this.energy++; // Increase energy level by 1

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1); // Remove the eaten grass from the grass array
                    break;
                }
            }
        } else {
            this.energy--; // Decrease energy level by 1
            this.move(); // Move the frog to a new cell
        }

        if (this.energy <= 0) {
            this.die(); // If energy level is zero or below, the frog dies
        }
    }

    eat() {
        if (this.isFrozen) {
            return; // If the frog is frozen, do not eat
        }

        if (this.isIll) {
            this.energy -= 1; // Decrease energy level by 1
            if (this.energy <= 0) {
                this.die(); // If energy level is zero or below, the frog dies
                return;
            }
            setTimeout(() => {
                this.eath(); // Eat grass or move to a new cell
                this.isIll = false; // Set the illness flag to false
            }, 2000); // Delay the eating for 2 seconds (simulating illness)
        } else {
            this.eath(); // Eat grass or move to a new cell
        }
    }

    mul() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0); // Get empty cells around the frog
        var newCell = random(emptyCells); // Choose a random empty cell
        console.log(emptyCells);

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3; // Set the frog's index at the new coordinates in the matrix

            var newFrog = new Frog(newX, newY, 3); // Create a new frog at the new coordinates

            frogArr.push(newFrog); // Add the new frog to the frog array

            this.energy = 2; // Reset the energy level
        } else {
            this.eat(); // Eat grass or move to a new cell
        }

        // CHECK
        // Check the gender of the frog and adjust the energy level accordingly
        if (this.gender === 0 && this.energy <= 3) {
            this.energy = 10; // If female and energy level is less than or equal to 3, set energy level to 10
        } else {
            this.energy = 3; // Otherwise, set energy level to 3
        }
    }

    die() {
        matrix[this.y][this.x] = 0; // Set the frog's current coordinates in the matrix as empty
        for (var i in frogArr) {
            if (this.x == frogArr[i].x && this.y == frogArr[i].y) {
                frogArr.splice(i, 1); // Remove the frog from the frog array
                break;
            }
        }
    }

    freeze() {
        this.isFrozen = true; // Set the frozen flag to true
        setTimeout(() => {
            this.isFrozen = false; // Set the frozen flag to false after 5 seconds
        }, 5000);
    }
}


class Snake {
    constructor(x, y, index, gender) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.speed = 1;
        this.index = index;
        this.gender = gender;
        this.directions = [];
        this.isIll = false;
        this.isFrozen = false;
    }
    getNewCoordinates() {

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];

    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        console.log(emptyCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }
    }

    eat() {
        this.getNewCoordinates();
        var frogCells = this.chooseCell(3);
        var newCell = random(frogCells);
        console.log(frogCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++
            for (var i in snakeArr) {
                if (newX == snakeArr[i].x && newY == snakeArr[i].y) {
                    snakeArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.energy--;
            this.move();
        }
        if (this.energy <= 0) {
            this.die();

        }
    }

    mul() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        console.log(emptyCells);

        if (newCell && this.energy >= 8) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newSnake = new Snake(newX, newY, 4);

            snakeArr.push(newSnake);

            this.energy = 2;

        }
        else {
            this.eat();
        }

        //CHECK
        if (this.gender === 0 && this.energy <= 3){
            this.energy = 10;
        }
        else {
            this.energy = 3;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in snakeArr) {
            if (this.x == snakeArr[i].x && this.y == snakeArr[i].y) {
                snakeArr.splice(i, 1);
                break;
            }
        }
    }
    freeze() {
        this.isFrozen = true;
        setTimeout(() => {
          this.isFrozen = false;
        }, 5000);
      }
}


class Owl {
    constructor(x, y, index, gender) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.speed = 1;
        this.index = index;
        this.gender = gender;
        this.directions = [];
        this.isIll = false;
        this.isFrozen = false;
    }
    getNewCoordinates() {

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];

    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        console.log(emptyCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }
    }

    eat() {
        this.getNewCoordinates();
        var manyCells = this.chooseCell(2 && 3);
        var newCell = random(manyCells);
        console.log(manyCells);

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++
            for (var i in owlArr) {
                if (newX == owlArr[i].x && newY == owlArr[i].y) {
                    owlArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.energy--;
            this.move();
        }
        if (this.energy <= 0) {
            this.die();

        }
    }

    mul() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        console.log(emptyCells);

        if (newCell && this.energy >= 8) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newOwl = new Owl(newX, newY, 5);

            owlArr.push(newOwl);

            this.energy = 2;

        }
        else {
            this.eat();
        }


        //CHECK
        if (this.gender === 0 && this.energy <= 3){
            this.energy = 10;
        }
        else {
            this.energy = 3;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in owlArr) {
            if (this.x == owlArr[i].x && this.y == owlArr[i].y) {
                owlArr.splice(i, 1);
                break;
            }
        }
    }
    freeze() {
        this.isFrozen = true;
        setTimeout(() => {
          this.isFrozen = false;
        }, 5000);
      }
}


class Decomposer extends LivingCreature {
    constructor(x, y, index, gender) {
        super(x, y, index, gender);
        this.energy = Infinity; // Decomposers have infinite energy
    }

    eat() {
        // Decomposers eat dead characters (GrassEater, Frog, Snake, Owl)
        var deadCharacters = this.chooseCell(2).concat(this.chooseCell(3)).concat(this.chooseCell(4)).concat(this.chooseCell(5));
        for (var i in deadCharacters) {
            var newX = deadCharacters[i][0];
            var newY = deadCharacters[i][1];
            matrix[newY][newX] = 0; // Set the cell to empty (0)

            // Remove the dead character from respective arrays
            for (var j in grassArrEater) {
                if (newX == grassArrEater[j].x && newY == grassArrEater[j].y) {
                    grassArrEater.splice(j, 1);
                    break;
                }
            }
            for (var j in frogArr) {
                if (newX == frogArr[j].x && newY == frogArr[j].y) {
                    frogArr.splice(j, 1);
                    break;
                }
            }
            for (var j in snakeArr) {
                if (newX == snakeArr[j].x && newY == snakeArr[j].y) {
                    snakeArr.splice(j, 1);
                    break;
                }
            }
            for (var j in owlArr) {
                if (newX == owlArr[j].x && newY == owlArr[j].y) {
                    owlArr.splice(j, 1);
                    break;
                }
            }
        }
    }

    mul() {
        // Decomposers never multiply
    }
}


