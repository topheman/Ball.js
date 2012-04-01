#Ball.js

The source code is widely documented, so you will find all the specifications for the methods in it. Also, here is API of Ball.js. Please try the [demos](http://labs.topheman.com/Ball/) on my site and the HTML5/Javascript Game I made : [Topheman Bombs](http://bombs.topheman.com)

##Files to include :
To use Ball.js, you only have to include Vector2D.js (a js implementation of the java class) and my own class : Ball.js :

```html
<script src="../Vector2D.js" type="text/javascript"></script>
<script src="../Ball.js" type="text/javascript"></script>
```

##Constructor parameters :
* x `<Int>`
* y `<Int>`
* radius `<Int>`
* mass `<Number>` (default 1)
* gravity `<Number>` (default 1)
* elasticity `<Number>` (default 1)
* friction `<Number>` (default 0.8)
* color `<String>` (hexa code)
* lifeTime `<Number>` (default `Infinity`)
* options `<Object>`
 * aging `<Boolean>` (`true` will activate aging mode - growing and shrinking balls at their construct and destruct)
 * borningRate `<Int>` number of frames to grow to radius (if aging = true, at the construct of the ball)
 * dyingRate `<Int>` number of frames to shrink from radius (when the  ball is dying or .toDeath() is triggered)
 * bouncingAlpha `<Boolean>` (true will activate alpha mode when the ball bounces against something)
 * bouncingColor `<String>|<Boolean>` (string color hexa code will activate the bounce color mode : the ball chnages color when bouncing against something)
 * bouncingRate `<Int>` number of frames the bounce effects will last
 * glowingColor `<String>|<Boolean>` (string color hexa code will allow to use glow() ant stopGlow() functions)
 * glowingRate `<Int>` (fps) number of frames the glowing effects will last
 * blinkingColor `<String>|<Boolean>` (string color hexa code will allow to use blink() ant stopBlink() functions)
 * blinkingRate `<Int>` (fps) number of frames the blinking effects will last
 * explodingAlpha `<Boolean>` (true will fade the ball when .explode() is triggered)
 * explodingColor `<String>` (string color hexa code)
 * explodingRadius `<Int>`
 * explodingRate `<Int>`

##Primary methods :
* __.move__(`dx <Number>`,`dy <Number>`) (this method __must__ be called so that your ball will be updated (coordinate as well as display)
* .checkBallCollision(`ball <Ball>`)
* .resolveBallCollision(`ball <Ball>`, `callback <Function>`)
* .manageStageBorderCollision(`stageWidth <Int>`, `stageHeight <Int>`, `callback <Function>`)
* .setRandomPositionAndSpeedInBounds(`stageWidth <Int>`, `stageHeight <Int>`)

##Rendering methods :
* .draw(`CanvasRenderingContext2D ctx`)
* .renderHtml()

##Getters / Setters methods :
* .getX() / .setX(`<Int>`)
* .getY() / .setY(`<Int>`)
* .getVelocityX() / .setVelocityX(`<Number>`)
* .getVelocityY() / .setVelocityY(`<Number>`)
* .getRadius() / .setRadius(`<Int>`)
* .getMass() / .setMass(`<Number>`)
* .getGravity() / .setGravity(`<Number>`)
* .getElasticity() / .setElasticity(`<Number>`)
* .getFriction() / .setFriction(`<Number>`)
* .getColor() / .setColor(`<String>`)
* .getAlpha() / .setAlpha(`<Number>`)
* .getLifeTime() / .setLifeTime(`<Number>`)
* .getBouncingColor()
* .getGlowingColor() / .setGlowingColor(`<String>`)
* .getGlowingRate() / .setGlowingRate(`<Int>`)
* .getBlinkingColor() / .setBlinkingColor(`<String>`)
* .getBlinkingRate() / .setBlinkingRate(`<Int>`)
* .getExplodingAlpha() / .setExplodingAlpha(`<Number>`)
* .getExplodingRadius() / .setExplodingRadius(`<Int>`)
* .getExplodingRate() / .setExplodingRate(`<Int>`)
* .getExplodingColor() / .setExplodingColor(`<String>`)
* .getDyingRate() / .setDyingRate(`<Int>`)

##Comportment methods :
* .glow() / .stopGlow()
* .blink() / .stopBlink()
* .explode()
* .toDeath()
* .die()

##Tests comportment methods :
* .isDead()
* .isDying()
* .isGlowing()
* .isBouncing()
* .isBlinking()
* .isExploding()



 