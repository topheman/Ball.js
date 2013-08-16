/* author: Jamie Nhu
 * email: duong_binhnhu@rocketmail.com
 * blog: http://jamieblog.org
 * date: 27th November 2011
 */
function Vector2D(x,y)
{
    this.x = x || 0;
    this.y = y || 0;//construct Vector2D with param x,y
    
}

Vector2D.prototype = {
    
    //set x value
    setX:function(x)
    {
        this.x=x;
    },

    //set y value
    setY:function(y)
    {
        this.y=y;
    },

    //magnitude
    getLength:function()
    {
        var length=Math.sqrt(this.x*this.x+this.y*this.y);
        return length;
    },

    //dot product
    dot:function(vector)
    {
        return this.x*vector.x+this.y*vector.y;
    },

    //add vector
    add:function(vector)
    {
        this.x+=vector.x;
        this.y+=vector.y;
        return this;
    },
            
    selfPlus:function(vector)
    {
        return this.add(vector);
    },

    //subtract
    subtract:function(vector)
    {
        this.x-=vector.x;
        this.y-=vector.y;
        return this;
    },

    //normalize
    normalize:function()
    {
        this.x=this.x/this.getLength();
        this.y=this.y/this.getLength();
        return this;
    },

    //scale (multiply)
    scale:function(scale)
    {
        this.x*=scale;
        this.y*=scale;
        return this;
    },
     
    selfMul:function(scale){
        return this.scale(scale);
    },
     
    scaleVec:function(scale){
        return this.scale(scale);
    },

    //has same direction
    hasSameDirection:function(vector)
    {
        if(this.isParralel(vector) && vector.x/this.x>0)
        {
            return true;
        }
        return false;
    },

    //check parallel
    isParallel:function(vector)
    {
        if(vector.x/this.x === vector.y/this.y)
        {
            return true;
        }
        return false;
    },

    //check perpendicular
    isPerpendicular:function(vector)
    {
        if(this.dot(vector)===0)
        {
            return true;
        }
        return false;
    },
            
    //equal
    isEqualTo:function(vector)
    {
        if(this.hasSameDirection(vector) && this.getLength()===vector.getLength())
        {
            return true;
        }
        return false;
    },

    //angle
    angleBetween:function(vector)
    {
        return Math.acos(this.dot(vector)/(this.getLength()*vector.getLength()));
    },

    // invert the vetor
    invert:function()
    {
        this.x*=-1;
        this.y*=-1;
        return this;
    },

    //to string
    toString:function()
    {
        return "Vector2d("+this.x+","+this.y+")";
    },
    
    copyFrom:function(x,y){
        this.x = x;
        this.y = y;
    }, 
            
    getRightNormal:function() {
        return new Vector2D(this.y, -this.x);
    },
            
    getLeftNormal:function() {
        return new Vector2D(-this.y, this.x);
    },     
    
    lerpSelfTo:function(that, scale) {
        this.x += (that.x - this.x) * scale;
        this.y += (that.y - this.y) * scale;
    }
    
};