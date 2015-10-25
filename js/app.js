// Enemies our player must avoid
var Enemy = function(initLoc, speedIn) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    var initEnemyLoc = function(initLoc) {
    var setLoc = [-100, (101 + (101 * initLoc))];//[x, y]
    return setLoc;
    };
    this.loc = initEnemyLoc(this.initLoc);
    var speedVariable = 1;
    this.speed = 5 * speedIn;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var movement = this.speed * dt;
    this.loc = this.loc + movement;
    if (this.loc[1] >= 606){
        initEnemyLoc(this.initLoc);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.initLoc = [202, 606];
    this.sprite = 'images/char-horn-girl.png';
    Resources.load(this.sprite);
};

Player.prototype.update = function() {

};

Player.prototype.render = function(){
    console.log(Resources.get(this.sprite));
    ctx.drawImage(Resources.get(this.sprite), 50, 50);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var sarah = new Enemy(1, 2);
var ben = new Enemy(2, 2);
var allEnemies = [sarah, ben];

var dean = new Player();
var player = dean;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
