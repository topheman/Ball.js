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

var balls = [];
var iterator = 0;
var looping = true;

var BALL_ADD_RATE     = 100;

var BALL_RADIUS       = 15;
var BALL_MASS         = 1.3;
var BALL_COLOR        = '#0000FF';//blue
var BALL_GRAVITY      = 1;
var BALL_ELASTICITY   = 0.98;
var BALL_FRICTION     = 1;
var BALL_LIFETIME     = 5000;

var width = window.innerWidth;
var height = window.innerHeight;

function animate(){
    var i,j;
    if(looping == true)
        window.requestAnimFrame(animate);
    else
        return;
    iterator++;

    //remove dead balls
    for(i=balls.length-1;i>=0;i--){
        if(balls[i].isDead() == true)
            balls.splice(i,1);
    }

    //add balls
    if(iterator%BALL_ADD_RATE == 0 || iterator == 1){
        var ball = new Ball(0, 0, BALL_RADIUS, BALL_MASS, BALL_GRAVITY, BALL_ELASTICITY, BALL_FRICTION, BALL_COLOR, BALL_LIFETIME, {/*alpha:0.19,*/aging:true,bouncingAlpha:true,bouncingColor:'#000000',htmlClassName:'ball',glowingColor:'#AA00AA',blinkingColor:'red',explodingColor:'#900000',explodingRadius:60,explodingAlpha:true});
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

    //draw balls

    //html mode
    if(renderingHtml == true){
        var innerHtml = "";
        for(i=0;i<balls.length;i++){
//            innerHtml += '<div class="ball" style="top:'+(balls[i].getY()-balls[i].getRadius())+'px;left:'+(balls[i].getX()-balls[i].getRadius())+'px;background:'+balls[i].getColor()+';width:'+balls[i].getRadius()*2+'px;height:'+balls[i].getRadius()*2+'px;border-radius:'+balls[i].getRadius()+'px;opacity:'+balls[i].getAlpha()+'"></div>';
            innerHtml += balls[i].renderHtml();
        }
        document.getElementById('stage').innerHTML = innerHtml;
    }
    //canvas mode
    else if(renderingCanvas == true){
        ctx.clearRect ( 0 , 0 , width , height );
        for(i=0;i<balls.length;i++){
            balls[i].draw(ctx);
        }
    }
}

function pause(){
    console.info('pause');
    if(looping == true)
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
    jQuery('#toggle-pause').click(function(){
        if(looping == true)
            looping = false;
        else{
            looping = true;
            animate();
        }
    })
    jQuery('#blink-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].blink();
            }
    })
    jQuery('#glow-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].glow();
            }
    })
    jQuery('#die-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].die();
            }
    })
    jQuery('#to-death-balls').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].toDeath();
            }
    })
    jQuery('#explode').click(function(){
        if(balls.length > 0)
            for(var i=0;i<balls.length;i++){
                balls[i].explode();
            }
    })
})