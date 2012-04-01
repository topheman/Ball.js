/* author: Jamie Nhu
 * email: duong_binhnhu@rocketmail.com
 * blog: http://jamieblog.org
 * date: 27th November 2011
 */
function Vector2D(x,y)
{
    this.x = x || 0;
    this.y = y || 0;//construct Vector2D with param x,y
    
    //set x value
    this.setX=function(x)
    {
        this.x=x;
    }

    //set y value
    this.setY=function(y)
    {
        this.y=y;
    }

    //magnitude
    this.getLength=function()
    {
        var length=Math.sqrt(this.x*this.x+this.y*this.y);
        return length;
    }

    //dot product
    this.dot=function(vector)
    {
        return this.x*vector.x+this.y*vector.y;
    }

    //add vector
    this.add=function(vector)
    {
        this.x+=vector.x;
        this.y+=vector.y;
        return this;
    }

    //subtract
    this.subtract=function(vector)
    {
        this.x-=vector.x;
        this.y-=vector.y;
        return this;
    }

    //normalize
    this.normalize=function()
    {
        this.x=this.x/this.getLength();
        this.y=this.y/this.getLength();
        return this;
    }

    //scale (multiply)
    this.scale=function(scale)
    {
        this.x*=scale;
        this.y*=scale;
        return this;
    }

    //has same direction
    this.hasSameDirection=function(vector)
    {
        if(this.isParralel(vector) && vector.x/this.x>0)
        {
            return true;
        }
        return false;
    }

    //check parallel
    this.isParallel=function(vector)
    {
        if(vector.x/this.x == vector.y/this.y)
        {
            return true;
        }
        return false;
    }

    //check perpendicular
    this.isPerpendicular=function(vector)
    {
        if(this.dot(vector)==0)
        {
            return true;
        }
        return false;
    }
    //equal
    this.isEqualTo=function(vector)
    {
        if(this.hasSameDirection(vector) && this.getLength()==vector.getLength())
        {
            return true;
        }
        return false;
    }

    //angle
    this.angleBetween = function(vector)
    {
        return Math.acos(this.dot(vector)/(this.getLength()*vector.getLength()));
    }

    // invert the vetor
    this.invert=function()
    {
        this.x*=-1;
        this.y*=-1;
        return this;
    }

    //to string
    this.toString=function()
    {
        return "Vector2d("+this.x+","+this.y+")";
    }
}