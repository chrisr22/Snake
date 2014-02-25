/**
 * 
 *
 * A Game of Snake, 2014
 * Created by Chris R.
 *
 *
 * Usage: Use your mouse to control the snake
 * 		  Eat the food to grow the snake
 *		  You lose when you hit the border or yourself
 *		  Refresh the page when dead to restart the game
 *
 *
 * Created for the Advacned Javascript Course
 */
 
var FOODNUM = 0;
var SNAKENUM = 0;

enchant();

// Conveniently generate a random integer from 0 up to but not including limit.
function randInt(limit) {
    return Math.floor(Math.random() * limit);
}


// Calculate the distance between two sprites
function pixelDistance(s1, s2) {
    var dx = s1.x - s2.x;
    var dy = s1.y - s2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Spawn a segment of the snake
function spawnSegment(game, xpos, ypos) {
	    var snake = new Sprite(16, 16);
        snake.image  = game.assets['sprite.png'];
        snake.x      = xpos;
        snake.y      = ypos;
        snake.anim   = [0];
        snake.frame  = 0;
        game.rootScene.addChild(snake);
        return snake;
}

// Move the segments (following the head)
function moveSegment(snake, SNAKENUM) {
	for(var i = SNAKENUM; i > 0; i--) {
		var oldx = snake[i-1].x;
		var oldy = snake[i-1].y;
		snake[i].x = oldx;
		snake[i].y = oldy;
	}
}

// Eat the food
function eatFood(food, game) {
	game.rootScene.removeChild(food);
}

// Spawn the food
function spawnFood(number, game) {
		var food = new Array();
		food[number] = new Sprite(16, 16);
        food[number].image  = game.assets['sprite.png'];
        var randomnumber = Math.floor(Math.random() * (20 - 3 + 1)) + 3;
        var int1 = (randomnumber * 16) - 32;
        var int2 = (randomnumber * 16) - 32;
        food[number].x      = int1;
        food[number].y      = int2;
        food[number].anim   = [0];
        food[number].frame  = 0;
        game.rootScene.addChild(food[number]);
        return food[number];
}

window.onload = function() {
    // Create a game object
    var game = new Core(320, 320);
    game.fps = 16;

    // Load Images
    game.preload('sprite.png','snakebg.png');

    // Called when the loading is complete
    game.onload = function() {
        var a = 0;
        // Create the background
        var bg = new Sprite(320, 320);
        bg.backgroundColor = "#fff000";
        var image = new Surface(320, 320);
        bg.image = game.assets['snakebg.png'];
        game.rootScene.addChild(bg);
        


        // Create snake
        var snake = new Array();
        snake[0] = spawnSegment(game, 160, 160);
        
        // Create food
		var food = new Array();
		food[0] = spawnFood(0, game);
        
        // Frame loop for the snake
        snake[0].addEventListener(Event.ENTER_FRAME, function() {
            
            // End the game if the snake hits the boundaries 
            if(snake[0].x <= 0 || snake[0].y <= 0 || snake[0].x >= 304 || snake[0].y >= 304) {
                game.end(0, "Goal");
                alert('game over! score: ' + SNAKENUM);
            }

            // Move up
            if (game.input.up) {
                if(SNAKENUM > 1 && a == 2) {
	                a = 2;
                } else {
	                a = 1;
				}
            }
            // Move down
            else if (game.input.down) {
                if(SNAKENUM > 1 && a == 1) {
	                a = 1;
                } else {
	                a = 2;
				}
            }
            // Move left
            else if (game.input.left) {
                if(SNAKENUM > 1 && a == 4) {
	                a = 4;
                } else {
	                a = 3;
				}
            }                    
            // Move right
            else if (game.input.right) {
                if(SNAKENUM > 1 && a == 3) {
	                a = 3;
                } else {
	                a = 4;
				}
            }
            
            // Move up loop
            if(a == 1)
                    if(SNAKENUM >= 1) {
						moveSegment(snake, SNAKENUM);
						snake[0].y -= 16;
					} else {
						snake[0].y -= 16;
					}
			// Move down loop		
            if(a == 2)
            		if(SNAKENUM >= 1) {
						moveSegment(snake, SNAKENUM);
						snake[0].y += 16;
					} else {
						snake[0].y += 16;
					}
			// Move left loop		
			if(a == 3)
            		if(SNAKENUM >= 1) {
						moveSegment(snake, SNAKENUM);
						snake[0].x -= 16;
					} else {
						snake[0].x -= 16;
					}
			// Move right loop
            if(a == 4)
                    if(SNAKENUM >= 1) {
						moveSegment(snake, SNAKENUM);
						snake[0].x += 16;
					} else {
						snake[0].x += 16;
					}
                        
            // Eat the food, spawn new food and grow the snake
			if (pixelDistance(snake[0],food[FOODNUM]) < 16) {
				eatFood(food[FOODNUM], game);
				FOODNUM = FOODNUM + 1;
				food[FOODNUM] = spawnFood(FOODNUM, game);
				SNAKENUM = SNAKENUM + 1;
				snake[SNAKENUM] = spawnSegment(game, 500,500);                                                                                                                                                                               
			}	
			
			// End the game if snake hits itself
			if(SNAKENUM >= 1) {
				for(var i = SNAKENUM; i > 0; i--) {
					if (pixelDistance(snake[0],snake[i]) < 16) {
						game.end(0, "Goal");
						alert('game over! score: ' + SNAKENUM);
					}
				}
			}
			
        });
    };
    
    //start game
    game.start();
};


