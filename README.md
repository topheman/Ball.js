#Ball.js

v1.0

Ball.js is a Javascript class that handles **physics interactions** between balls on a flat area (i.e. collisions) as well as **rendering**.
You can **render in canvas mode as well as in html mode**.
You have a bunch of display effects such as glowing, blinking, exploding (changing the radius, color, alpha) ...

I made an **HTML5/Javascript** game based on this class. You can see it in action on [Topheman Bombs](http://bombs.topheman.com)

You can [see the examples live](http://labs.topheman.com/Ball) (source code on github repository)

This class could be used in all kinds of animations and games such as pool billard or air hockey ...

##[See Ball.js API](https://github.com/topheman/Ball.js/blob/master/Wiki.md)

##Files to include :
To use Ball.js, you only have to include Vector2D.js (a js implementation of the java class) and my own class : Ball.js :

```html
<script src="../Vector2D.js" type="text/javascript"></script>
<script src="../Ball.js" type="text/javascript"></script>
```

##Improvements todo :

* Include Vector2D inside Ball.js to optimize garbage collection

copyright © 2012 Christophe Rosset (Topheman), released under [Creative Commons 3.0 license](http://creativecommons.org/licenses/by-sa/3.0/)