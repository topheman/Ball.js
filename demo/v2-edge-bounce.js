/*!
 * TophemanBall
 * http://ball.topheman.com/
 *
 * Copyright 2012, Christophe Rosset (Topheman)
 * http://blog.topheman.com/
 * http://twitter.com/topheman
 *
 * rendering-test.js
 * 
 * Testing script for Ball.js
 * 
 * Runs with
 * - canvas-rendering.html (canvas render support)
 * - html-rendering.html (html render support)
 * 
 * NOTE : I didn't bother about scopes, so you WILL see lots of global variables (remember it's only a test)
 */

var ctx = null;

var walls = [];
var balls = [];
var iterator = 0;
var looping = true;

var BALL_ADD_RATE     = 1000;

var BALL_RADIUS       = 15;
var BALL_MASS         = 1.3;
var BALL_COLOR        = '#0000FF';//blue
var BALL_GRAVITY      = 1;
var BALL_ELASTICITY   = 0.98;
var BALL_FRICTION     = 1;
var BALL_LIFETIME     = 5000;

var BALL_OPTIONS      = {/*alpha:0.19,*/aging:true,bouncingAlpha:true,bouncingColor:'#000000',htmlClassName:'ball',glowingColor:'#AA00AA',blinkingColor:'red',explodingColor:'#900000',explodingRadiusRatio:2,explodingAlpha:true};

var width = window.innerWidth;
var height = window.innerHeight;

function prepareStage(){
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        prepareWalls();
        animate();
    }
    else{
        alert('No canvas drawing support');
    }
    
    //draw walls
    drawWalls(ctx);
}

function prepareWalls(){
    
    var wall1 = [];
    wall1.push({x:300,y:600});
    wall1.push({x:300,y:200});
    walls.push(wall1);
    var wall2 = [];
    wall2.push({x:570,y:600});
    wall2.push({x:540,y:200});
    walls.push(wall2);
    var wall3 = [];
    wall3.push({x:350,y:80});
    wall3.push({x:650,y:80});
    walls.push(wall3);
    var wall4 = [];
    wall4.push({x:350,y:750});
    wall4.push({x:650,y:750});
    walls.push(wall4);
    var wall4 = [];
    wall4.push({x:650,y:200});
    wall4.push({x:800,y:400});
    walls.push(wall4);
    var wall4 = [];
    wall4.push({x:220,y:500});
    wall4.push({x:50,y:230});
    walls.push(wall4);
    
}

function drawWalls(ctx){
    
    //loop through walls
    for(var i=0;i<walls.length;i++){
        ctx.beginPath();
        //loops through segments
        for(var j=0;j<walls[i].length;j++){
            //loop through points
            if(j === 0){
                ctx.moveTo(walls[i][j].x,walls[i][j].y);
            }
            else{
                ctx.lineTo(walls[i][j].x,walls[i][j].y);
            }
        }
        if(j > 1)
            ctx.closePath();
        ctx.stroke();
    }
    
}

function animate(){
    var i,j;
    if(looping === true)
        window.requestAnimFrame(animate);
    else
        return;
    iterator++;

    //remove dead balls
    for(i=balls.length-1;i>=0;i--){
        if(balls[i].isDead() === true)
            balls.splice(i,1);
    }

    //add balls
    if(iterator%BALL_ADD_RATE === 0 || iterator === 1){
        var ball = new Ball(0, 0, BALL_RADIUS, BALL_MASS, BALL_GRAVITY, BALL_ELASTICITY, BALL_FRICTION, BALL_COLOR, BALL_LIFETIME, BALL_OPTIONS);
        ball.setRandomPositionAndSpeedInBounds(width, height);
        balls.push(ball);
    }

    //move balls
    for(i=0;i<balls.length;i++){
        balls[i].move();
    }

    //check balls vs border collision
    for(i=0;i<balls.length;i++){
        balls[i].manageStageBorderCollision(width, height);
    }

    //check ball vs ball collision
    for(i=0;i<balls.length;i++){
        for(j=i+1;j<balls.length;j++){
            if(balls[i].checkBallCollision(balls[j]) === true){
                balls[i].resolveBallCollision(balls[j]);
            }
        }
    }

    //check ball vs ball collision
    for(i=0;i<balls.length;i++){
        //loop through walls
        for(j=0;j<walls.length;j++){
            //loop through segments (start with the second point)
            for(k=1;k<walls[j].length;k++){
                if(balls[i].checkEdgeCollision(walls[j][k],walls[j][k-1])){
//                    console.info('segmentCollision','x1:',walls[j][k].x,'y1',walls[j][k].y,'x2:',walls[j][k-1].x,'y2',walls[j][k-1].y);
                    balls[i].setColor(getRandomColor());
                    balls[i].resolveEdgeCollision(walls[j][k],walls[j][k-1]);
                    break;
                }
            }
        }
    }

    //move balls
    for(i=0;i<balls.length;i++){
        balls[i].move();
    }
    
    //clear canvas
    ctx.clearRect ( 0 , 0 , width , height );
 
    //draw walls
    drawWalls(ctx);

    //draw balls
    for(i=0;i<balls.length;i++){
        balls[i].draw(ctx);
    }
    
}

function pause(){
    console.info('pause');
    if(looping === true)
        looping = false;
    else{
        looping = true;
        animate();
    }
}

function getRandomColor(){
//    return '#'+Math.floor(Math.random()*16777215).toString(16));
    return '#'+Math.floor((function(){var r = Math.random();return (r >= 0.1 ? r : r*10);})()*16777215).toString(16);
}

jQuery(function(){
    //prepare canvas then start animation onload
    prepareStage();
    
    jQuery('#toggle-pause').click(function(){
        if(looping === true)
            looping = false;
        else{
            looping = true;
            animate();
        }
    });
    jQuery('#blink-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].blink();
            }
    });
    jQuery('#glow-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].glow();
            }
    });
    jQuery('#die-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].die();
            }
    });
    jQuery('#to-death-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].toDeath();
            }
    });
    jQuery('#explode').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].explode();
            }
    });
    jQuery('#radius-plus').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].toRadius(balls[i].getRadius()+15);
            }
    });
    jQuery('#radius-minus').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].toRadius(balls[i].getRadius()-10);
            }
    });
})