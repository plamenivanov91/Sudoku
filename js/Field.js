function Field() {

  PIXI.Container.call(this);
  this.subsquare0 = [];
  this.subsquare1 = [];
  this.subsquare2 = [];
  this.subsquare3 = [];
  this.subsquare4 = [];
  this.subsquare5 = [];
  this.subsquare6 = [];
  this.subsquare7 = [];
  this.subsquare8 = [];
  this.subSquaresArr = [];
  this.winCounter = 0;
  this.matrixWidth = 9;
  this.matrixHeight = 9;
  this.x = 50;
  this.y = 50;
  this.generateField();
  this.currentSelection = null;
  this.generateBoardNumbers();

  that = this;
}

Field.prototype = Object.create(PIXI.Container.prototype);
Field.prototype.constructor = Field;

Field.prototype.generateField = function() {
  var square;

  var yMargin = 0;
  var xMargin = 0;
  var subSquareItBelongs = -1;
  var subsquareAddition = -1;

  this.matrix = new Array();
  for (i = 0; i < this.matrixWidth; i++) {
    this.matrix[i] = new Array();

    if (i % 3 == 0) {
      xMargin += 10;
      if (i > 0) {
        subSquareItBelongs += 3;
      } else {
        subSquareItBelongs++;
      }
    }
    for (j = 0; j < this.matrixHeight; j++) {

      if (j % 3 == 0) {
        yMargin += 10;
        subsquareAddition++;
      }
      square = new Square((52 * i) + xMargin, (52 * j) + yMargin, i, j, (subSquareItBelongs + subsquareAddition).toString());

      square.on("click", this.onSquareClicked, this);
      this.matrix[i][j] = square;
      this.addChild(this.matrix[i][j]);
    }

    subsquareAddition = -1;
    yMargin = 0;

  }
  for (var i = 0; i < this.children.length; i++) {
    switch (this.children[i].inSubSquare) {
      case '0':
        this.subsquare0.push(this.children[i]);
        break;
      case '1':
        this.subsquare1.push(this.children[i]);
        break;
      case '2':
        this.subsquare2.push(this.children[i]);
        break;
      case '3':
        this.subsquare3.push(this.children[i]);
        break;
      case '4':
        this.subsquare4.push(this.children[i]);
        break;
      case '5':
        this.subsquare5.push(this.children[i]);
        break;
      case '6':
        this.subsquare6.push(this.children[i]);
        break;
      case '7':
        this.subsquare7.push(this.children[i]);
        break;
      case '8':
        this.subsquare8.push(this.children[i]);
        break;
    }
  }

  this.subSquaresArr.push(this.subsquare0, this.subsquare1, this.subsquare2, this.subsquare3, this.subsquare4, this.subsquare5, this.subsquare6, this.subsquare7, this.subsquare8);

}

Field.prototype.onSquareClicked = function(event) {

  var square = event.target;

  window.addEventListener("keydown", function checkKey(e) {
    e = e || square.event;
    if (square.isSelected() == true) {

      function keyHandler(square, keyNum) {
        if (that.makesConflict(square, keyNum)) {
          if (square.digit.text != " " && square.digit.style.fill == "blue") {
          that.winCounter--;
          }
          square.digit.text = keyNum.toString();
          square.digit.style.fill = "red";
        } else {
          if (!(square.digit.text != " " && square.digit.style.fill == "blue")) {
            that.winCounter++;
          }
          square.digit.text = keyNum.toString();
          square.digit.style.fill = "blue";
        }
        if (that.winCounter == that.children.length) {
          for (var i = 0; i < that.children.length; i++) {
            that.children[i].interactive = false;
          }
          console.log("Game Won!");
        }
        else {
          console.log("game Not won!");
        }
      }

      if (e.keyCode == '49') {
        keyHandler(square, 1);
      } else if (e.keyCode == '50') {
        keyHandler(square, 2);
      } else if (e.keyCode == '51') {
        keyHandler(square, 3);
      } else if (e.keyCode == '52') {
        keyHandler(square, 4);
      } else if (e.keyCode == '53') {
        keyHandler(square, 5);
      } else if (e.keyCode == '54') {
        keyHandler(square, 6);
      } else if (e.keyCode == '55') {
        keyHandler(square, 7);
      } else if (e.keyCode == '56') {
        keyHandler(square, 8);
      } else if (e.keyCode == '57') {
        keyHandler(square, 9);
      }
      square.isSelected(false);
    }
  })

  if (this.currentSelection != null && this.currentSelection != square) {
    this.currentSelection.isSelected(false);
  }
  if (square.isSelected() == false) {
    square.isSelected(false);
  }

  if (square.isSelected() == true) {
    square.isSelected(false);
  } else if (square.isSelected() == false) {
    square.isSelected(true);
  }
  this.currentSelection = square;
}

Field.prototype.makesConflict = function(square, num) {
  var subSquare = parseInt(square.inSubSquare);
  var desiredSubSuqareArr = this.subSquaresArr[subSquare];

  for (var i = 0; i < desiredSubSuqareArr.length; i++) {
    if (desiredSubSuqareArr[i].digit.text == num) {
      return true;
    }
  }

  for (var i = 0; i < this.matrixWidth; i++) {
    if (this.matrix[i][square.posY].digit.text == num) {
      return true;
    }
  }

  for (var i = 0; i < this.matrixHeight; i++) {
    if (this.matrix[square.posX][i].digit.text == num) {
      return true;
    }
  }
  return false;
}

Field.prototype.generateBoardNumbers = function() {

  for (var i = 0; i < this.children.length; i++) {
    var square = this.children[i];
    if (square.availableSquares.length == 0) {
      for (var j = 0; j < 9; j++) {
        square.availableSquares[j] = j + 1;
      }
      i -= 2;
      continue;
    }

    var indexOfRandomGuess = Math.floor(Math.random() * square.availableSquares.length);
    var randomGuess = square.availableSquares[indexOfRandomGuess];

    if (this.makesConflict(square, randomGuess)) {
      square.digit.text = " ";
      square.availableSquares.splice(indexOfRandomGuess, 1);
      i--;
    } else {
      square.digit.text = randomGuess.toString();
    }
  }

  for (var i = 0; i < this.subSquaresArr.length; i++) {
    this.removeNumbersFromSubSquare(this.subSquaresArr[i], 4);
  }

  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].digit.text != " ") {
      this.winCounter++;
      this.children[i].interactive = false;
      this.children[i].digit.style.fill = "purple";
    }
  }
  console.log("Puzzle Generated");
}

Field.prototype.removeNumbersFromSubSquare = function(arr, numbers) {

  var possibleIndexes = arr.slice(0);

  for (var i = 0; i < numbers; i++) {
    var elementToBeChanged = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
    elementToBeChanged.digit.text = " ";
    possibleIndexes.splice(possibleIndexes.indexOf(elementToBeChanged), 1);
  }

}
