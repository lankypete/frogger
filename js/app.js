var score = undefined; //How do I initialize var to undefined without specifying undefined?
var scoreFunction = function(inScore) {
    ctx.font = "36pt Helvetica";
    ctx.fillText("Score", 130, 640);
    if (inScore === undefined) {
        console.log('here');
        score = 0;
        oldScore = 0;
    }
    if (inScore !== oldScore) {
        ctx.clearRect(300, 600, 200, 200);
        oldScore = score;
    }

    ctx.fillText(oldScore, 350, 640);
};
// Enemies our player must avoid
var Enemy = function(initLoc, initLocX, speedIn) { //added initLocX to start enemies at different gaps
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.initLoc = initLoc; // gets called in renewLoc function
    this.initLocX = initLocX;
    var initEnemyLoc = function(initLoc, initLocX) { //Any way to use this function again in Enemy.prototype.update?
        var setLoc = [-100 * initLocX, (-25 + (85 * initLoc))]; //[x, y]
        return setLoc;
    };
    this.loc = initEnemyLoc(initLoc, initLocX);
    //var speedVariable = 5;
    this.speed = 10 * speedIn;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var movement = this.speed * dt;
    this.loc[0] = this.loc[0] + movement;
    if (this.loc[0] >= 606) {
        this.loc = this.renewLoc(this.initLoc, this.initLocX);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.loc[0], this.loc[1]);
};

Enemy.prototype.renewLoc = function(initLoc, initLocX) {
    var setLoc = [-100 * initLocX, (-25 + (85 * initLoc))]; //[x, y]
    return setLoc;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.loc = [202, 404];
    this.sprite = 'images/char-horn-girl.png';
    Resources.load(this.sprite);
};

Player.prototype.update = function() {
    var curX = this.loc[0],
        curY = this.loc[1];

    allEnemies.forEach(function(enemy) {
        var eX = enemy.loc[0],
            eY = enemy.loc[1];
        if ((curX >= eX &&
                curX < eX + 100) ||
            (curX + 101 > eX && curX + 101 <= eX + 100)) {
            if (curY > eY - 20 && curY < eY + 20) {
                player.loc = Player.prototype.collision();
            }
        }
    });
};

Player.prototype.collision = function() {
    var reset = [202, 404];
    score = score - 1;
    return reset;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.loc[0], this.loc[1]);
};
Player.prototype.initLoc = function(loc) {
    loc[0] = 202;
    loc[1] = 404;
};

Player.prototype.handleInput = function(keyIn) {
    if (keyIn === 'up') {
        if (this.loc[1] - 85 > 60) { //Check if player wins
            this.loc[1] = this.loc[1] - 85;
        } else {
            this.initLoc(this.loc);
            score = score + 1; //Should this be a global variable?  Or in the Player scope?
        }
    }
    if (keyIn === 'down') {
        if (this.loc[1] < 404) {
            this.loc[1] = this.loc[1] + 85;
        } else { //do I need this else statement?
        }
    }
    if (keyIn === 'left') {
        if (this.loc[0] > 0) {
            this.loc[0] = this.loc[0] - 101;
        }
    }
    if (keyIn === 'right') {
        if (this.loc[0] < 404) {
            this.loc[0] = this.loc[0] + 101;
        }
    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var sarah = new Enemy(1, 1, 5);
var ben = new Enemy(2, 2, 10);
var lolo = new Enemy(3, 1, 11);
var zozo = new Enemy(1, 2, 14);
var haha = new Enemy(2, 3, 9),
    sleepy = new Enemy(3, 3, 8);
var allEnemies = [sarah, ben, lolo, zozo, haha, sleepy];

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