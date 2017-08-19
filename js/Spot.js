function Square(x, y, posX, posY, subSquare) {

  PIXI.Sprite.call(this);
  this.width = 50;
  this.height = 50;

  this.interactive = true;
  this.x = x;
  this.y = y;
  this._isSelected = false;
  this.texture = PIXI.Texture.fromImage("square.png");
  this.posX = posX;
  this.posY = posY;
	this.inSubSquare = subSquare;
  this.availableSquares = [];
  for (var i = 0; i < 9; i++) {
    this.availableSquares[i] = i + 1;
  }
  this.digit = new PIXI.Text(" ", {
    font: "80px Tahoma",
    fill: "blue"
  });

  this.digit.position.x = 35;
  this.digit.position.y = 20;

  this.addChild(this.digit);

}

Square.prototype = Object.create(PIXI.Sprite.prototype);
Square.prototype.constructor = Square;

Square.prototype.isSelected = function(value) {
  if (value == undefined) {
    return this._isSelected;
  }

  this._isSelected = value;
  if (value == false) {
    this.texture = PIXI.Texture.fromImage("square.png");
  } else if (value == true) {
    this.texture = PIXI.Texture.fromImage("squareSelect.png");
  };

}
