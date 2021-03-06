/***********************************************************************
 JavaScript Classes
 Basic classes definition
 
 Copyright (c) 2018 Sergio Lindau

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
/***********************************************************************/


/***********************************************************************
 References
 ==========
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes
https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript
https://www.w3schools.com/jsref/jsref_obj_date.asp
/***********************************************************************/

function key(str) {
	var temp = 0;
	for(var i=0;i<str.length;i++){
		temp += str.charCodeAt(i);
	}
	return temp;
}


/***********************************************************************
 DOM Helper
/***********************************************************************/
class $$ {
	static $(type,descr,index) {
		var result = [];
		switch(type) {
			case 'i' : result = [ document.getElementById(descr) ]; break;
			case 'n' : result = document.getElementsByName(descr); break;
			case 'c' : result = document.getElementsByClassName(descr); break;
			case 't' : result = document.getElementsByTagName(descr); break;
			case 'tn' :
				if (arguments.length>3) return document.getElementsByTagNameNS(descr,arguments[2])[arguments[3]]
				else return document.getElementsByTagNameNS(descr,arguments[2]);
				break;
			default  : return document.getElementById(type);
		}
		if (arguments.length>2) {
			return result[arguments[2]];
		}
		else {
			return result;
		}
	}
	static _(dest,source,prop) {
		for(var k=0;i<dest.length;k++) {
			dest[k][prop] = source[prop];
		}
		return dest;
	}
	static create(tag,parent,i,c,n) {
		if (arguments.length==1)
			return document.createElement(tag)
		else {
			var result = document.createElement(tag)
			if (parent) {
				parent = (typeof(parent) == 'string') ? document.getElementById(parent) : parent;
				parent.append(result);
			}
			if ((arguments.length>2) && (i)) result.setAttribute('id',i);
			if ((arguments.length>3) && (c)) result.setAttribute('class',c);
			if ((arguments.length>4) && (n)) result.setAttribute('name',n);
			return result;
		}
	}
	static addEventListener(element, event, func, useCapture) {
		element = (typeof(element) == 'string') ? document.getElementById(element) : element;
		useCapture = (arguments.length>3) ? useCapture : false;
		element.addEventListener(event,func,useCapture);
		return element;
	}
}
/***********************************************************************/

class $ {
	static $ = {
		i : function(i) { return document.getElementById(i) },
		n : function(n) { return document.getElementsByName(n) },
		c : function(c) { return document.getElementsByClassName(c) },
		t : function(n) { return document.getElementsByTagName(n) },
		tn : function(ns,n) { return document.getElementsByTagNameNS(ns,n) }
	};
	static _(dest,source,prop) {
		var temp = $.$.i(source);
		for(var k=0;i<dest.length;k++) {
			dest[k][prop] = temp[prop];
		}
		return dest;
	}
	static copy = {
		i : function(dest,source,prop) { 
			var temp1 =  $.$.i(dest), temp2 = $.$.i(source);
			temp1[prop] = temp2[prop];
			return temp1;
		},
		n : function(dest,source,prop) {
			return _($.$.n(dest),source,prop);
		},
		c : function(dest,source,prop) {
			return _($.$.c(dest),source,prop);
		},
		t : function(dest,source,prop) {
			return _($.$.t(dest),source,prop);
		},
		tn : function(ns,dest,source,prop) {
			return _($.$.tn(ns,dest),source,prop);
		}
	};
	static create(tag) { return document.createElement(tag) }
	static select = {
		addOptions : function(sel, opt) {
			sel = $.$.i(sel);
			var option;
			for (var k=0;i<opt.length;k++) {
				option = $.create('option');
				option.text = opt[i];
				sel.add(option);
			}
		}
	};
}
/***********************************************************************/


/***********************************************************************
 Common RegExp constants
/***********************************************************************/
const RegExp_Float = /^\d+(\.\d*)?([eE][\+\-]?\d+)?$/;
/***********************************************************************/


/***********************************************************************
 JavaScript Point Object
 Point class with support for 2D and 3D, cartesian and polar
 Copyright (c) 2018 Sergio Lindau
/***********************************************************************/
class Coordinates {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

	toStringCartesian()
	{
    	return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	}

	distance()
	{
    	return Math.sqrt (this.x*this.x + this.y*this.y + this.z*this.z);
	}

	normalize()
	{
    	var r = this.distance();
	    if (r == 0.0) {
    	    throw "Cannot normalize null vector.";
	    }
    	return new Coordinates(this.x/r, this.y/r, this.z/r);
	}
	subtract(other)
	{
    	return new CartesianCoordinates (this.x - other.x, this.y - other.y, this.z - other.z);
	}

	add(other)
	{
    	return new CartesianCoordinates (this.x + other.x, this.y + other.y, this.z + other.z);
	}

	AngleBetweenVectorsInDegrees(va, vb)
	{
	    var a = va.Normalize ();
	    var b = vb.Normalize ();

	    // The normalized dot product of two vectors is equal to the cosine of the angle between them.
	    var dotprod = a.x*b.x + a.y*b.y + a.z*b.z;
	    var abs = Math.abs (dotprod);
	    if (abs > 1.0) {
	        if (abs > 1.00000001) {
    	        // Something is really messed up!  Avoid impossible Math.Acos() argument...
	            throw "Internal error: dot product = " + dotprod;
	        } else {
	            // Assume that roundoff error has caused a valid dot product value to wander outside allowed values for Math.Acos()...
	            return (dotprod < 0) ? 180.0 : 0.0;
	        }
	    } else {
	        return AngleX.DEG_FROM_RAD * Math.acos (dotprod);
	    }
	}

    static distancia(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}
/***********************************************************************/

function SphericalCoordinates (longitude, latitude, radius)
{
    this.longitude = longitude;
    this.latitude  = latitude;
    this.radius    = radius;
}

//----------------------------------------------------------------------------------------------

function GeographicCoordinates (longitude, latitude, elevationInMetersAboveSeaLevel)
{
    if (elevationInMetersAboveSeaLevel == null) {
        elevationInMetersAboveSeaLevel = 0.0;
    }

    this.longitude = longitude;
    this.latitude  = latitude;
    this.radius    = (elevationInMetersAboveSeaLevel / METERS_PER_ASTRONOMICAL_UNIT) + EARTH_RADII_PER_ASTRONOMICAL_UNIT;
}

//----------------------------------------------------------------------------------------------
function ParseAngle (s, max)
{
    // Look for 1..3 floating pointer numbers, delimited by colons.
    // For example:  37.35   or   43:15.373   or  23:44:55.7  
    // These represent degrees[:minutes[:seconds]].
    // We ignore any white space outside the floating point numbers.
    var angle = null;
    var array = s.split(/\s*:\s*/);
    if (array.length >= 1 && array.length <= 3) {
        var denom = 1.0;
        angle = 0.0;
        for (var i=0; i < array.length; ++i) {
            if (!RegExp_Float.test(array[i])) {
                return null;    // does not look like a valid floating point number
            }
            
            var x = parseFloat (array[i]);
            if (isNaN(x)) {
                return null;    // could not parse a floating point number
            }
            
            if (x < 0) {
                return null;    // user must specify direction by using E/W, N/S controls, not '+' or '-'.
            }
            if (i > 0) {
                if (x >= 60.0) {
                    return null;    // not a valid minute or second value
                }
            }
            
            angle += x / denom;
            denom *= 60.0;
        }
        
        if (angle < 0.0 || angle > max) {
            return null;
        }
    }
    return angle;
}



/***********************************************************************
 JavaScript Angle Object
 Angle object that abstracts representation and do roundings and
 format strings.
 Copyright (c) 2018 Sergio Lindau
***********************************************************************/
class Angle {
	// Angle field get/set descriptors
	static DEC = 0;
	static RAD = 1;
	static SIG = 2;
	static DIR = 3;
	static DEG = 4;
	static HOURS = 5;
	static HOUR = 6;
	static MIN = 7;
	static HMIN = 8;
	static SEC = 9;
	static HSEC = 10;
	static MSEC = 11;
	static HMSEC = 12;
	static DEGSTR = 13;
	static RADSTR = 14;
	static HSTR = 15;
	static SIN = 16;
	static COS = 17;
	static TAN = 18;
	static ASIN = 19;
	static ACOS = 20;
	static ATAN = 21;
	static ATAN2 = 22;
	static DATE = 23;
	static UNIXTIME = 24;
	static DOTPROD = 25;
	
	static DEG_FROM_RAD = 180.0 / Math.PI;
	static RAD_FROM_DEG = Math.PI / 180.0;
	static HOURS_FROM_RAD = 12.0 / Math.PI;
	static RAD_FROM_HOURS = Math.PI / 12.0;
	
    constructor(/*[decimal] or [[sign],degree,min[,sec]]*/) {
		this.dec = 0;
		this.roundms = false;
		if (arguments.length==1) { // decimal
			this.dec = arguments[0];
		}
		else if (arguments.length==2) { // signed degree, min
			this.dec = arguments[0]+arguments[1]/60;
		}
		else if (arguments.length==3) { // signed degree , min , sec
			this.dec = arguments[0]+(arguments[1]*60+arguments[2])/3600;
		}
		else if (arguments.length==4) { // sig,degree,min,sec
			this.dec = ((arguments[0]!=0)?(arguments[0] / Math.abs(arguments[0])):0) * (arguments[1]+(arguments[2]*60+arguments[3])/3600);
		}
    }
/***********************************************************************/
	_minute(fraction){
		return Math.abs(~~(fraction*60))+~~(this._second(this.dec-~~this.dec)/60);
	}
/***********************************************************************/
	_second(fraction){
		return Math.abs(Math.round10((fraction - (~~(fraction*60))/60)*3600,-9));
	}
/***********************************************************************/
	set_sigdegminsec(sig,deg,min,sec){
		this.dec = sig*(deg+(min*60+sec)/3600);
	}
/***********************************************************************/
	get(field){
		if (arguments<1) field = Angle.DEC;
		switch(field) {
			case Angle.DEC:
				return this.dec;
			case Angle.RAD:
				return this.dec*Angle.RAD_FROM_DEG;
			case Angle.SIG:
				return (this.dec!=0)?(this.dec/Math.abs(this.dec)):0;
			case Angle.DIR:
				return (this.dec<0)?1:0;
			case Angle.DEG:
				return Math.abs(~~this.dec)+~~(this._minute(this.dec-~~this.dec)/60);
			case Angle.HOURS:
				return Math.abs(this.dec/15);
			case Angle.HOUR:
				return Math.abs(~~this.dec/15)+~~(_minute(this.dec/15-~~(this.dec/15))/60);
			case Angle.MIN:
				return this._minute(this.dec-~~this.dec)%60;
			case Angle.HMIN:
				return this._minute(this.dec/15-~~(this.dec/15))%60;
			case Angle.SEC:
				return this._second(this.dec-~~this.dec)%60;
			case Angle.HSEC:
				return this._second(this.dec/15-~~(this.dec/15))%60;
			case Angle.MSEC:
				return (this._second(this.dec-~~this.dec)%60)*1e-3;
			case Angle.HMSEC:
				return (this._second(this.dec/15-~~(this.dec/15))%60)*1e-3;
			case Angle.DEGSTR:
				return (this.get(Angle.SIG)*this.get(Angle.DEG))+"º"+this.get(Angle.MIN)+"'"+this.get(Angle.SEC)+"''";
			case Angle.RADSTR:
				return Math.round10(this.dec/180,-9)+"π";
			case Angle.HSTR:
				return (this.get(Angle.SIG)*this.get(Angle.HOUR))+"<sup>h</sup>"+this.get(Angle.MIN)+"<sup>m</sup>"+this.get(Angle.SEC)+"<sup>s</sup>";
			case Angle.SIN:
				return Math.sin(this.dec*Angle.RAD_FROM_DEG);
			case Angle.COS:
				return Math.cos(this.dec*Angle.RAD_FROM_DEG);
			case Angle.TAN:
				return Math.tan(this.dec*Angle.RAD_FROM_DEG);
			case Angle.DATE:
				var temp = new Date();
				temp.setUTCHours(this.get(Angle.HOURS));
				temp.setUTCMinutes(this.get(Angle.HMIN));
				temp.setUTCSeconds(this.get(Angle.HSEC));
				temp.setUTCMilliseconds(this.get(Angle.HMSEC));
				return temp;
		}
	}
/***********************************************************************/
	set(field, x, y){
		if ((arguments<2)&&(typeof(arguments[0]=='number'))) field = Angle.DEC;
		if ((arguments<2)&&(typeof(arguments[0]=='string'))) field = Angle.DEGSTR;
		switch(field) {
			case Angle.DEC:
				this.dec = x;
				break;
			case Angle.RAD:
				this.dec = x*DEG_FROM_RAD;
				break;
			case Angle.SIG:
				this.dec = ((x!=0)?(x/Math.abs(x)):0)*Math.abs(this.dec);
				break;
			case Angle.DIR:
				this.dec = ((x==0)?1:-1)*Math.abs(this.dec);
				break;
			case Angle.DEG:
				this.dec = (this.get(Angle.SIG)?this.get(Angle.SIG):1)*(x+Math.abs(this.dec-~~this.dec));
				break;
			case Angle.HOURS:
				this.dec = x*15;
				break;
			case Angle.HOUR:
				this.dec = (this.get(Angle.SIG)?this.get(Angle.SIG):1)*(x*15+Math.abs(this.dec/15-~~(this.dec/15)));
				break;
			case Angle.MIN:
				this.set_sigdegminsec((this.get(Angle.SIG)?this.get(Angle.SIG):1),this.get(Angle.DEG),x,this.get(Angle.SEC));
			case Angle.HMIN:
				this.set_sigdegminsec((this.get(Angle.SIG)?this.get(Angle.SIG):1),this.get(Angle.HOUR)*15,x,this.get(Angle.HSEC));
				break;
			case Angle.SEC:
				this.set_sigdegminsec((this.get(Angle.SIG)?this.get(Angle.SIG):1),this.get(Angle.DEG),this.get(Angle.MIN),x);
				break;
			case Angle.HSEC:
				this.set_sigdegminsec((this.get(Angle.SIG)?this.get(Angle.SIG):1),this.get(Angle.HOUR)*15,this.get(Angle.HMIN),x);
				break;
			case Angle.ASIN:
				this.dec = Angle.DEG_FROM_RAD * Math.asin(x);
				break;
			case Angle.ACOS:
				this.dec = Angle.DEG_FROM_RAD * Math.acos(x);
				break;
			case Angle.ATAN:
				this.dec = Angle.DEG_FROM_RAD * Math.atan(x);
				break;
			case Angle.DATE:
				this.dec = Angle.DEG_FROM_RAD * Math.atan2(x,y);
				break;
			case Angle.UNIXTIME://*******
				this.dec = Angle.DEG_FROM_RAD * Math.atan2(x,y);
				break;
			case Angle.DOTPROD:
			    var a = x.normalize();
			    var b = y.normalize();
			    // The normalized dot product of two vectors is equal to the cosine of the angle between them.
	    		var dotprod = a.x*b.x + a.y*b.y + a.z*b.z;
			    var abs = Math.abs (dotprod);
	    		if (abs > 1.0) {
			        if (abs > 1.00000001) {
    			        // Something is really messed up!  Avoid impossible Math.Acos() argument...
	            		throw "Internal error: dot product = " + dotprod;
			        } else {
	    		        // Assume that roundoff error has caused a valid dot product value to wander outside allowed values for Math.Acos()...
	            		this.dec = (dotprod < 0) ? 180.0 : 0.0;
			        }
			    } else {
	    		    this.dec = Angle.DEG_FROM_RAD * Math.acos (dotprod);
			    }
				break;
		}
		return this;
	}
/***********************************************************************/




    static FixHours(hours)
    {
        return Angle.FixCycle (hours, 24.0);
    }
    
    static FixDegrees(degrees)
    {
        return Angle.FixCycle (degrees, 360.0);
    }
    
    static FixCycle(angle, cycle)
    {
        var fraction = angle / cycle;
        return cycle * (fraction - Math.floor (fraction));
    }
    
    static Polar(x, y, z)
    {
        var rho = (x * x) + (y * y);
        var radius = Math.sqrt (rho + (z * z));
        var phi = Math.atan2d (y, x);
        if (phi < 0) {
            phi += 360.0;
        }
        var rho = Math.sqrt (rho);
        var theta = Math.atan2d (z, rho);
        return new SphericalCoordinates (phi, theta, radius);
    }
    
    static DMS(x)
    {
        var a = {};
        
        a.negative = (x < 0);
        if (a.negative) {
            x = -x;
        }
        
        a.degrees = Math.floor (x);
        x = 60.0 * (x - a.degrees);
        a.minutes = Math.floor (x);
        x = 60.0 * (x - a.minutes);
        a.seconds = Math.round (10.0 * x) / 10.0;   // Round to the nearest tenth of an arcsecond.
        
        if (a.seconds == 60) {
            a.seconds = 0;
            if (++a.minutes == 60) {
                a.minutes = 0;
                ++a.degrees;
            }
        }
        
        return a;
    }
    
    static DMM(x)
    {
        var a = {};
        a.negative = (x < 0);
        if (a.negative) {
            x = -x;
        }
        
        a.degrees = Math.floor (x);
        x = 60.0 * (x - a.degrees);
        a.minutes = Math.round (100.0 * x) / 100.0;     // Round to nearest hundredth of an arcminute.
        a.seconds = 0.0;        // Fill in just for consistency with AngleX.DMS
        
        if (a.minutes >= 60.0) {
            a.minutes -= 60.0;
            ++a.degrees;
        }
        
        return a;
    }
    
    static SafeArcSinInDegrees(z)
    {
        var abs = Math.abs (z);
        if (abs > 1.0) {
            // Guard against blowing up due to slight roundoff errors in Math.Asin ...
            if (abs > 1.00000001) {
                throw "Invalid argument to SafeArcSinInDegrees";
            } else if (z < -1.0) {
                return -90.0;
            } else {
                return +90.0;
            }
        } else {
            return Math.RADEG * Math.asin(z);
        }
    }





}
/***********************************************************************/
console.logAngle = function (angle){
	console.log("get_dec(): "+angle.get_dec());
	console.log("get_rad(): "+angle.get_rad());
	console.log("get_rad_str(): "+angle.get_rad_str());
	console.log("get_sig(): "+angle.get_sig());
	console.log("get_dir(): "+angle.get_dir());
	console.log("get_deg(): "+angle.get_deg());
	console.log("get_min(): "+angle.get_min());
	console.log("get_sec(): "+angle.get_sec());
	console.log("get_deg_str(): "+angle.get_deg_str());
	console.log("===============================");
}
/***********************************************************************/

/***********************************************************************
 Date object extensions for calendar and astronomy calculations
/***********************************************************************/
class DateTime {
/***********************************************************************
 JavaScript DateTime Object
 Date object extensions for astronomy calculations
 Copyright (c) 2018 Sergio Lindau
 
 This lybrary provides the DateTime Object, an extension of object Date
 described in ECMAScript 2015 (6th Edition, ECMA-262) available in:
 https://www.ecma-international.org/ecma-262/6.0/#sec-date-objects
 It provides useful aditional time methods for calendar and astronomy
 calculations for Date javascript object.
 
 Additional References:
 =====================
   https://www.iana.org/time-zones
   http://tzdata-javascript.org/
   http://www.nuestrocalendario.info/
   http://www.staff.science.uu.nl/~gent0113/calendar/isocalendar_text4.htm
   http://stjarnhimlen.se/comp/time.html
   https://momentjs.com/timezone/docs/
   https://sourceforge.net/projects/astroalgorithms/files/latest/download
   http://ptspts.blogspot.com/2009/11/how-to-convert-unix-timestamp-to-civil.html
   https://www.avrfreaks.net/forum/converting-unix-time-date-stamp-human-readable-form
   https://howardhinnant.github.io/date/tz.html
   https://stackoverflow.com/questions/7960318/math-to-convert-seconds-since-1970-into-date-and-vice-versa
   https://www.unixtimestamp.com/index.php
   https://www.epochconverter.com/
   https://www.toptal.com/software/definitive-guide-to-datetime-manipulation
/***********************************************************************/
	static YEAR = 1;
	static MONTH = 2;
	static DATE = 3;
	static DOY = 4;
	static DOW = 5;
	static HOUR = 6;
	static MINUTE = 7;
	static SECOND = 8;
	static MILLISECOND = 9;
	static TZOFFSET = 10;
	static DSTOFFSET = 11;
	static WEEKSTR = 12;
	static MONTHSTR = 13;
	static T24H = 14;
	static TAMPM = 15;
	static weekdayString = [
		"Sun","Mon","Tue","Wed","Thu","Fri","Sat"
	];
	static monthString = [
		"Jan","Feb","Mar","Apr","May","Jun",
		"Jul","Aug","Sep","Oct","Nov","Dec"
	];
	static pad(n) {
	    return n<10 ? "0"+n : n;
	}
	static pad3(n) {
		if (n<100) {
			if (n<10) return "00"+n
			else return "0"+n;
		}
		else return n;
	}
	constructor(year, month, date, hours, minutes, seconds, ms, tz){
/***********************************************************************
 Name: DateTime
 Type: Constructor
 Return value:
   the DateTime instance corresponding to the arguments.
***********************************************************************/
		if ((arguments.length==1)&&(typeof(arguments[0]=='string')))
		{
			this.baseDate = new Date(arguments[0]);
			this.isLocal = false;
			tz = DateTime.parseTZOffset(tz);
		}
		else {
		if (arguments.length>7) {
			tz = DateTime.parseTZOffset(tz);
		}
		else {
			tz = DateTime.parseTZOffset("LOCAL");
		}
		this.isLocal = tz.tzone=="LOCAL";
		this.TZString = tz.tzone;
		this.LocalTZAdjust = tz.tzoffset;
		switch (arguments.length) {
    	case 0:
			this.baseDate = new Date();
			break;
    	case 1:
			if (Math.abs(year)<=19200) {
				if (this.isLocal) this.baseDate = new Date(year, 0, 1, 12, 0, 0, 0)
				else this.baseDate = new Date(Date.UTC(year, 0, 1, 12, 0, 0, 0)+this.LocalTZAdjust*6e4);
			}
			else {
				this.baseDate = new Date(year);
			}
			break;
    	case 2:
			if (this.isLocal) this.baseDate = new Date(year, month, 1, 12, 0, 0, 0)
			else this.baseDate = new Date(Date.UTC(year, month, 1, 12, 0, 0, 0)+this.LocalTZAdjust*6e4);
			break;
	    case 3:
			if (this.isLocal) this.baseDate = new Date(year, month, date, 12, 0, 0, 0)
			else this.baseDate = new Date(Date.UTC(year, month, date, 12, 0, 0, 0)+this.LocalTZAdjust*6e4);
			break;
    	case 4:
			if (this.isLocal) this.baseDate = new Date(year, month, date, hours, 0, 0, 0)
			else this.baseDate = new Date(Date.UTC(year, month, date, hours, 0, 0, 0)+this.LocalTZAdjust*6e4);
			break;
	    case 5:
			if (this.isLocal) this.baseDate = new Date(year, month, date, hours, minutes, 0, 0)
			else this.baseDate = new Date(Date.UTC(year, month, date, hours, minutes, 0, 0)+this.LocalTZAdjust*6e4);
			break;
    	case 6:
			if (this.isLocal) this.baseDate = new Date(year, month, date, hours, minutes, seconds, 0)
			else this.baseDate = new Date(Date.UTC(year, month, date, hours, minutes, seconds, 0)+this.LocalTZAdjust*6e4);
			break;
	    case 7:
	    case 8:
    	default:
			if (this.isLocal) this.baseDate = new Date(year, month, date, hours, minutes, seconds, ms)
			else this.baseDate = new Date(Date.UTC(year, month, date, hours, minutes, seconds, ms)+this.LocalTZAdjust*6e4);
		}
		if ((arguments.length>0)&&(year>=0)&&(year<=99)) {
			this.baseDate.setTime(this.baseDate.getTime()-59958144e6)
		}
		this.DSTAdjust = (this.isLocal)?this.getDSTOffset():0;
		this.TZDate = new Date(this.baseDate.valueOf() - (this.LocalTZAdjust - this.DSTAdjust));
		}
	}
	UTC2TZ(){
		this.TZDate.setTime(this.baseDate.valueOf() - (this.LocalTZAdjust - this.DSTAdjust)*6e4);
	}
	TZ2UTC(){
		this.baseDate.setTime(this.TZDate.valueOf() + (this.LocalTZAdjust - this.DSTAdjust)*6e4);
	}


	static UNIX(year, month, date, hours, minutes, seconds, ms) {
/***********************************************************************
 Name: DateTime.UNIX
 Type: Static Function
 Purpose: Get UNIX timestamp.
 Return value:
   UNIX timestamp (Number)
***********************************************************************/
		var temp;
		if (arguments.length>0) {
			if ((arguments.length==1)&&(Math.abs(year)>19200)) {
				return year;
			}
			else {
				temp = Date.UTC(year,month!=undefined?month:0,date!=undefined?date:1,hours!=undefined?hours:12,minutes!=undefined?minutes:0,seconds!=undefined?seconds:0,ms!=undefined?ms:0);
				if ((year>=0)&&(year<=99)) {
					temp -= 59958144e6;
				}
				return temp;
			}
		}
		else {
			temp = new Date();
			return temp.getTime();
		}
	}

	static parseTZOffset(tzoffs){
/***********************************************************************
 Name: DateTime.parseTZOffset
 Type: Static Function
 Purpose: Get timezone offset string parsed in minutes.
 Return value:
   timezone offset (Number)
***********************************************************************/
		if (typeof(tzoffs)=='string') {
			var tzstr = "", offs = DateTime.LocalTZA(), s;
			function func(){
				s = (tzoffs.substring(0,1)=="-")?1:-1;
				if (s==-1) tzoffs = "+" + tzoffs;
				offs = s * (Number(tzoffs.substring(1,tzoffs.length-2))*60 + Number(tzoffs.substring(3,tzoffs.length)));
			}
			tzoffs = tzoffs.trim().replace(/[ +:]/g,"").toUpperCase();
			tzoffs = tzoffs.replace(/^[G]([M][T]?)?/,"GMT");
			tzoffs = tzoffs.replace(/^[U]([T][C]?)?/,"UTC");
			tzoffs = tzoffs.replace(/^[L]([O]([C]([A][L]?)?)?)?/,"LOCAL");
			if (tzoffs=="LOCAL") {
				tzstr = "LOCAL";
			} else if ((tzoffs.substring(0,3)=="GMT")||(tzoffs.substring(0,3)=="UTC")) {
				tzstr = tzoffs.substring(0,3);
				tzoffs = (tzoffs.length>3)?tzoffs.substring(3,tzoffs.length):"0000";
				func();
			} else if (tzoffs.charAt(0)=="Z") {
				tzstr = "Z";
				tzoffs = (tzoffs.length>1)?tzoffs.substring(1,tzoffs.length):"0000";
				func();
			} else if ((tzoffs.charAt(0)=="+")||
				(tzoffs.charAt(0)=="-")||
				((tzoffs.charAt(0)>="0")&&(tzoffs.charAt(0)<="9"))) {
				func();
				tzstr = (offs==DateTime.LocalTZA())?"LOCAL":"GMT";
			}
		}
		else if (typeof(tzoffs)=='number') {
			offs = tzoffs;
			tzstr = (offs==DateTime.LocalTZA())?"LOCAL":"GMT";
		}
		return {tzone:tzstr, tzoffset:offs};
	}

	getTimezoneString(){
/***********************************************************************
 Name: DateTime.getTimezoneString
 Type: Static Function
 Purpose: Get timezone string.
 Return value:
   timezone string (String)
***********************************************************************/
		if (this.TZString=="LOCAL") {
			return this.TZString;
		}
		else {
			var s = (this.LocalTZAdjust<0)?"+":"-";
			var h = Math.floor(Math.abs(this.LocalTZAdjust)/60);
			var m = Math.abs(this.LocalTZAdjust) % 60;
			return this.TZString+s+((h>10)?h:("0"+h))+((m>10)?m:("0"+m));
		}
	}

	static LocalTZA(){
/***********************************************************************
 Name: DateTime.LocalTZA
 Type: Function
 Purpose: return the standard timezone difference between UTC and Local
   Time (without Daylight Saving Time offset)
 Return value:
   A Number, representing the standard time difference between UTC and
   Local Time, in minutes
***********************************************************************/
		var jan = new Date();
		jan.setUTCMonth(0);
		jan.setUTCDate(1);
		var jul = new Date();
		jul.setUTCMonth(6);
		jul.setUTCDate(1);
	    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	}

	setIsLocal(flag){
/***********************************************************************
 Name: DateTime.setIsLocal
 Type: Function
 Purpose: Set DateTime object default local timezone flag.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.isLocal = flag;
		if (this.isLocal) {
			this.TZString = "LOCAL";
			this.LocalTZAdjust = DateTime.LocalTZA();
			this.DSTAdjust = this.getDSTOffset();
		}
		else {
			if (this.TZString=="LOCAL") this.TZString = "GMT";
			this.DSTAdjust = 0;
		}
		return this;
	}

	getIsLocal(){
/***********************************************************************
 Name: DateTime.getIsLocal
 Type: Function
 Purpose: Get DateTime object default local timezone flag.
 Return value:
   the Date (DateTime)
***********************************************************************/
		return this.isLocal;
	}
	
	setLocalTZOffset(offs){
/***********************************************************************
 Name: DateTime.setLocalTZOffset
 Type: Function
 Purpose: Set local timezone offset.
 Return value:
   the Date (DateTime)
***********************************************************************/
		if (typeof(offs)=='string') {
			offs = DateTime.parseTZOffset(offs);
			this.isLocal = offs.tzone=="LOCAL";
			this.TZString = offs.tzone;
			this.LocalTZAdjust = offs.tzoffset;
		}
		else {
			if (offs==DateTime.LocalTZA()) {
				this.isLocal = true;
				this.TZString = "LOCAL";
			}
			else {
				this.isLocal = false;
				this.TZString = "GMT";
			}
			this.DSTAdjust = 0;
			this.LocalTZAdjust = offs;
		}
		return this;
	}

	getLocalTZOffset(){
/***********************************************************************
 Name: DateTime.getLocalTZOffset
 Type: Function
 Purpose: Get timezone offset in minutes.
 Return value:
   A Number, representing the time difference between UTC and
   Local Time, in minutes
***********************************************************************/
		return this.LocalTZAdjust;
	}

	setDSTOffset(offs){
/***********************************************************************
 Name: DateTime.setDSTOffset
 Type: Function
 Purpose: Set daylight saving time adjust offset.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.isLocal = false;
		if (this.TZString=="LOCAL") this.TZString = "GMT";
		this.DSTAdjust = offs;
		return this;
	}

	getDSTOffset(){
/***********************************************************************
 Name: DateTime.DSTOffset
 Type: Function
 Purpose: get daylight saving time shift in minutes
 Return value:
   daylight saving time in minutes (Number)
***********************************************************************/
		if (this.isLocal) {
			return DateTime.LocalTZA() - this.baseDate.getTimezoneOffset();
		}
		else {
			return this.DSTAdjust;
		}
	}

	isDST(){
/***********************************************************************
 Name: DateTime.isDST
 Type: Function
 Purpose: test if daylight saving time
 Return value:
   true if daylight saving time, false otherwise
***********************************************************************/
		return (this.getDSTOffset() != 0);
	}

	getTimezoneOffset(){
/***********************************************************************
 Name: DateTime.getTimezoneOffset
 Type: Function
 Purpose: return the timezone difference between UTC and Local Time in
   minutes. Extending equivalent Date method to support timezones
 Return value:
   A Number, representing the standard time difference between UTC and
   Local Time, in minutes
***********************************************************************/
		if (this.isLocal) {
			return this.baseDate.getTimezoneOffset()
		}
		else {
			return this.LocalTZAdjust - this.DSTAdjust;
		}
	}

	setNow(){
/***********************************************************************
 Name: DateTime.setNow
 Type: Function
 Purpose: Set DateTime to now.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(Date.now());
		return this;
	}

	copy(){
/***********************************************************************
 Name: DateTime.copy
 Type: Function
 Purpose: Create a copy of DateTime date object.
 Return value:
   the copy of DateTime (DateTime)
***********************************************************************/
		var d = new DateTime();
		d.baseDate.setTime(this.baseDate.getTime());
		return d;
	}

	setUTC(year,month,date,hours,minutes,seconds,ms){
/***********************************************************************
 Name: DateTime.setUTC
 Type: Function
 Purpose: Set DateTime object, with UTC arguments, like constructor.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(Date.UTC(year,month,date,hours,minutes,seconds,ms));
		return this;
	}

	setLocal(year,month,date,hours,minutes,seconds,ms){
/***********************************************************************
 Name: DateTime.setLocal
 Type: Function
 Purpose: Set DateTime, with arguments in local offset, like constructor.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(Date.UTC(year,month,date,hours,minutes,seconds,ms)+this.baseDate.getTimezoneOffset()*6e4);
		return this;
	}

/***********************************************************************/
	getDate() {
		if (this.isLocal) {
			return this.baseDate.getDate();
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCDate();
		}
	}
/***********************************************************************/
	getUTCDate() {
		return this.baseDate.getUTCDate()
	}
/***********************************************************************/
	setDate(t) {
		if (this.isLocal) {
			this.baseDate.setDate(t);
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCDate(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	setUTCDate(t) {
		this.baseDate.setUTCDate(t)
	}
/***********************************************************************/
	getDay() {
		return this.baseDate.getDay()
	}
/***********************************************************************/
	getUTCDay() {
		return this.baseDate.getUTCDay()
	}
/***********************************************************************/
	getLocalDay(){
/***********************************************************************
 Name: DateTime.getLocalDay
 Type: Function
 Purpose: return local day of week
 Return value:
   the 0-6 local day of week corresponding to sunday, monday, ...
***********************************************************************/
		if (this.baseDate.getUTCDate()==this.baseDate.getDate()) {
			return this.baseDate.getUTCDay();
		}
		else {
			var w = this.baseDate.getUTCDay()-((this.baseDate.getTimezoneOffset()>0)?1:0);
			if (w<0) w = 6;
			return w;
		}
	}
/***********************************************************************/
	getFullYear() {
		if (this.isLocal) {
			return this.baseDate.getFullYear();
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCFullYear();
		}
	}
/***********************************************************************/
	setFullYear(t) {
		if (this.isLocal) {
			this.baseDate.setFullYear(t);
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCFullYear(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getYear() {
		if (this.isLocal) {
			return this.baseDate.getYear();
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCFullYear();
		}
	}
/***********************************************************************/
	setYear(t) {
		if (this.isLocal) {
			this.baseDate.setYear(t);
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCFullYear(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getUTCFullYear() {
		return this.baseDate.getUTCFullYear()
	}
/***********************************************************************/
	setUTCFullYear(t) {
		this.baseDate.setUTCFullYear(t)
	}
/***********************************************************************/
	getHours() {
		if (this.isLocal) {
			return this.baseDate.getHours();
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCHours();
		}
	}
/***********************************************************************/
	setHours(t) {
		if (this.isLocal) {
			this.baseDate.setHours(t);
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCHours(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getUTCHours() {
		return this.baseDate.getUTCHours();
	}
/***********************************************************************/
	setUTCHours(t) {
		this.baseDate.setUTCHours(t);
	}
/***********************************************************************/
	getMilliseconds() {
		if (this.isLocal) {
			return this.baseDate.getMilliseconds()
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCMilliseconds();
		}
	}
/***********************************************************************/
	setMilliseconds(t) {
		if (this.isLocal) {
			this.baseDate.setMilliseconds(t)
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCMilliseconds(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getUTCMilliseconds() {
		return this.baseDate.getUTCMilliseconds()
	}
/***********************************************************************/
	setUTCMilliseconds(t) {
		this.baseDate.setUTCMilliseconds(t)
	}
/***********************************************************************/
	getMinutes() {
		if (this.isLocal) {
			return this.baseDate.getMinutes()
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCMinutes();
		}
	}
/***********************************************************************/
	setMinutes(t) {
		if (this.isLocal) {
			this.baseDate.setMinutes(t)
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCMinutes(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getUTCMinutes() {
		return this.baseDate.getUTCMinutes()
	}
/***********************************************************************/
	setUTCMinutes(t) {
		this.baseDate.setUTCMinutes(t)
	}
/***********************************************************************/
	getMonth() {
		if (this.isLocal) {
			return this.baseDate.getMonth()
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCMonth();
		}
	}
/***********************************************************************/
	setMonth(t) {
		if (this.isLocal) {
			this.baseDate.setMonth(t)
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCMonth(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getUTCMonth() {
		return this.baseDate.getUTCMonth()
	}
/***********************************************************************/
	setUTCMonth(t) {
		this.baseDate.setUTCMonth(t)
	}
/***********************************************************************/
	getSeconds() {
		if (this.isLocal) {
			return this.baseDate.getSeconds()
		}
		else {
			this.UTC2TZ();
			return this.TZDate.getUTCSeconds();
		}
	}
/***********************************************************************/
	setSeconds(t) {
		if (this.isLocal) {
			this.baseDate.setSeconds(t)
		}
		else {
			this.UTC2TZ();
			this.TZDate.setUTCSeconds(t);
			this.TZ2UTC();
		}
	}
/***********************************************************************/
	getUTCSeconds() {
		return this.baseDate.getUTCSeconds()
	}
/***********************************************************************/
	setUTCSeconds(t) {
		this.baseDate.setUTCSeconds(t)
	}
/***********************************************************************/
	static now = Date.now;
/***********************************************************************/
	static parse = Date.parse;
/***********************************************************************/
	getTime() {
		return this.baseDate.getTime()
	}
/***********************************************************************/
	setTime(t) {
		this.baseDate.setTime(t)
	}
/***********************************************************************/
	getTZDate() {
		return {
			w : this.TZDate.getUTCDay(),
			d : this.TZDate.getUTCDate(),
			m : this.TZDate.getUTCMonth(),
			y : this.TZDate.getUTCFullYear()
		};
	}
/***********************************************************************/
	getTZTime() {
		return {
			h : this.TZDate.getUTCHours(),
			m : this.TZDate.getUTCMinutes(),
			s : this.TZDate.getUTCSeconds(),
			ms : this.TZDate.getUTCMilliseconds()
		};
	}
/***********************************************************************/
	static timeToString(time,field) {
		if (arguments.length<2) field = DateTime.SECOND;
		switch (field) {
			case DateTime.HOUR:
				return DateTime.pad(Math.round((time.m+time.s/60)/60));
			case DateTime.MINUTE:
				return DateTime.pad(time.h) + ":" + DateTime.pad(time.m+Math.round(time.s/60));
			case DateTime.SECOND:
				return DateTime.pad(time.h) + ":" + DateTime.pad(time.m) + ":" + DateTime.pad(time.s);
			case DateTime.MILLISECOND:
				return DateTime.pad(time.h) + ":" + DateTime.pad(time.m) + ":" + DateTime.pad(time.s) + "." + Math.round(time.ms*1e3);
		}
	}
/***********************************************************************/
	static timeToString24 = DateTime.timeToString;
/***********************************************************************/
	static timeToStringAMPM(time) {
		return DateTime.pad(time.h % 12) + ":" + DateTime.pad(time.m) + ":" + DateTime.pad(time.s) + " " + (Math.trunc(time.h/12)?"PM":"AM");
	}
/***********************************************************************/
	static dateToString(date) {
		return DateTime.weekdayString[date.w]+" "+DateTime.monthString[date.m]+" "+DateTime.pad(date.d)+" "+date.y;
	}
/***********************************************************************/
	static dateToStringISO(date) {
		return date.y+"-"+DateTime.pad(date.m+1)+"-"+DateTime.pad(date.d);
	}
/***********************************************************************/
	static offsetToString(offset) {
		var s = (offset<0)?"+":"-";
		var h = Math.trunc(Math.abs(offset)/60);
		var m = Math.abs(offset) % 60;
		return "GMT"+s+DateTime.pad(h)+DateTime.pad(m);
	}
/***********************************************************************/
	toDateString() {
		if (this.isLocal) {
			return this.baseDate.toDateString();
		}
		else {
			this.UTC2TZ();
			return DateTime.dateToString(this.getTZDate());
		}
	}
/***********************************************************************/
	toGMTString() {
		return this.baseDate.toGMTString();
	}
/***********************************************************************/
	toISOString() {
		return this.baseDate.toISOString();
	}
/***********************************************************************/
	toJSON() {
		return this.baseDate.toJSON();
	}
/***********************************************************************/
	toLocaleDateString() {
		if (this.isLocal) {
			return this.baseDate.toLocaleDateString();
		}
		else {
			this.UTC2TZ();
			return DateTime.dateToStringISO(this.getTZDate());
		}
	}
/***********************************************************************/
	toUTCDateString() {
		return this.baseDate.toISOString().substring(0,10);
	}
/***********************************************************************/
	toLocaleTimeString() {
		if (this.isLocal) {
			return this.baseDate.toLocaleTimeString();
		}
		else {
			this.UTC2TZ();
			return DateTime.timeToString(this.getTZTime());
		}
	}
/***********************************************************************/
	toUTCTimeString() {
		return this.baseDate.toISOString().substring(11,19);
	}
/***********************************************************************/
	toLocaleTimeStringAMPM() {
		if (this.isLocal) {
			return this.baseDate.toLocaleTimeString();
		}
		else {
			this.UTC2TZ();
			return DateTime.timeToStringAMPM(this.getTZTime());
		}
	}
/***********************************************************************/
	toLocaleString() {
		if (this.isLocal) {
			return this.baseDate.toLocaleString();
		}
		else {
			this.UTC2TZ();
			return this.toLocaleDateString()+" "+this.toLocaleTimeString();
		}
	}
/***********************************************************************/
	toString() {
		if (this.isLocal) {
			return this.baseDate.toString();
		}
		else {
			this.UTC2TZ();
			return this.toDateString() + " " + this.toTimeString();
		}
	}
/***********************************************************************/
	toTimeString() {
		if (this.isLocal) {
			return this.baseDate.toTimeString();
		}
		else {
			this.UTC2TZ();
			return this.toLocaleTimeString() + " " + DateTime.offsetToString(this.LocalTZAdjust-this.DSTAdjust) + (this.DSTAdjust?" DST":"");
		}
	}
/***********************************************************************/
	toUTCString() {
		return this.baseDate.toUTCString();
	}
/***********************************************************************/
	static UTC = Date.UTC;
/***********************************************************************/
	valueOf() {
		return this.baseDate.valueOf();
	}
/***********************************************************************/
	formatToString(format, larg){
/***********************************************************************
 Name: DateTime.formatToString
 Type: Function
 Purpose: Format DateTime as a string.
 Return value:
   Formatted DateTime (string)
***********************************************************************/
	var format, larg, islocal, strdata = [];
	if (arguments.length>0) format = format.toString().trim().toLowerCase();
	if (arguments.length>1) larg = larg.toString().trim().toLowerCase();
	islocal = (larg=="loc")||(larg=="local");
	if (format=="date") {
		if (islocal) return this.baseDate.toLocaleDateString()
		else return this.baseDate.toDateString();
	}
	else if (format=="doy") {
		var data;
		if (islocal)
			data = this.baseDate.toString().split(" ");
		else
			data = this.baseDate.toUTCString().split(" ");
		var month, date = Number(data[1]);
		if (isNaN(date)) {
			date = Number(data[2]);
			month = data[1];
		}
		else {
			month = data[2];
		}
		return date+" "+month;
	}
	else if ((format=="time")||(format=="time24")) {
		if (islocal) return this.baseDate.toLocaleTimeString()
		else {
			var isNegative = this.baseDate.getFullYear()<0;
			return this.baseDate.toISOString().substr(isNegative?14:11, 8);
		}
	}
	else if ((format=="clock")||(format=="clock24")) {
		if (islocal) return this.baseDate.toLocaleTimeString().substr(0, 5);
		else {
			var isNegative = this.baseDate.getFullYear()<0;
			return this.baseDate.toISOString().substr(isNegative?14:11, 5);
		}
	}
	else if (format=="clockampm") {
		function fill0left(num,length){
			var temp = num.toString();
			while (temp.length<length) temp = "0"+temp;
			return temp;
		}
		if (islocal) {
			var h = this.getHours();
			return (h>12)?fill0left(h-12,2):fill0left(h.toString(),2)+":"+fill0left(this.getMinutes(),2)+((h>11)?" PM":" AM");
		}
		else {
			var h = this.getUTCHours();
			return (h>12)?fill0left(h-12,2):fill0left(h.toString(),2)+":"+fill0left(this.getUTCMinutes(),2)+((h>11)?" PM":" AM");
		}
	}
	else if (format=="gmt") return this.baseDate.toGMTString();
	else if (format=="iso") return this.baseDate.toISOString();
	else if (format=="json") return this.baseDate.toJSONString();
	else if (format=="utc") return this.baseDate.toGMTString();
	else if ((format=="str")||(format=="string")) {
		if (islocal) return this.baseDate.toLocaleString()
		else return this.baseDate.toString();
	}
	else if ((format=="val")||(format=="value")) return this.baseDate.valueOf();
	return this.baseDate.toLocaleString()
}

/***********************************************************************
  DateTime prototype constants for calendar and astronomy calculations
***********************************************************************/
/* Seconds per day. */
static SD = 24*60*60;
/* Milliseconds per second. */
static MS = 1e3;
/* Milliseconds per day. */
static DMS = DateTime.SD*DateTime.MS;
/* Days per non-leap year. */
static DJYY = 365;
/* Days per Julian year. */
static DJY = DateTime.DJYY+1/4;
/* Days per gregorian year (the mean year across the complete leap cycle
   of 400 years is 365.2425 days because 97 out of 400 years are leap
   years). */
static DGY = DateTime.DJYY+97/400;
/* Average number of days in a month (march to december). */
static DJMN = (DateTime.DJYY - (31 + 28) ) / 10;
/* Days per Julian century. */
static DJC = DateTime.DJY*100;
/* Milliseconds per Julian century. */
static MSC = DateTime.DMS*DateTime.DJC;
/* Days per Julian millennium. */
static DJM = DateTime.DJY*1e3;
/* Length of tropical year B1900 (days). */
static DTY = 365.242198781;
/* Julian Date of Modified Julian Date zero */
static DJM0 = 2400000.5;
/* Reference epoch (J1970.0), Julian Date (midnight 1 Jan 1970 - Unix Time
   reference). */
static DJ70 = 2440587.5;
/* Reference epoch (J1970.0), Modified Julian Date (midnight 1 Jan 1970 -
   Unix Time reference). */
static DJM70 = DateTime.DJ70-DateTime.DJM0;
/* Diference in milliseconds between J1970.0 and J2000.0 at noon. */
static M7020 = Date.UTC(2000,0,1,12);
/* Diference in days between J1970.0 and J2000.0 at noon. */
static D7020 = DateTime.M7020/DateTime.DMS;
/* Reference epoch (J2000.0), Julian Date. */
static DJ00 = DateTime.DJ70+DateTime.D7020;
/* Reference epoch (J2000.0), Modified Julian Date */
static DJM00 = DateTime.DJ00-DateTime.DJM0;
/* Julian day in 29 Feb 1 BCE (day 0 for calendar). */
static DJCE0 = 1721118;
/* ???? */
static DJLM0000 = ( 14 + 31*( 10 + 12*1582 ));
/* Julian day in 14 Oct 1582 (noon of last day of julian calendar). */
static DJL = 2299160;
/* L_G = 1 - d(TT)/d(TCG) */
static ELG = 6.969290134e-10;
/* TT minus TAI (ms). */
static TTMTAIMS = 32.184e3;
/* Conversion factor from seconds of time to radians. */
static S2R = Math.PI/(12*60*60);
/* Number of days in [i][0] each month, [i][1] cumulative at start of each
   month (non-leap year), [i][2] cumulative at start of each month (leap year)  */
static monthTable = [
		[31,  0,  0],
		[28, 31, 31],
		[31, 59, 60],
		[30, 90, 91],
		[31,120,121],
		[30,151,152],
		[31,181,182],
		[31,212,213],
		[30,243,244],
		[31,273,274],
		[30,304,305],
		[31,334,335],
	];
static paschalFullMoon = [
		["month", "date"],
		/* 1*/[4,14],
		/* 2*/[4,03],
		/* 3*/[3,23],
		/* 4*/[4,11],
		/* 5*/[3,31],
		/* 6*/[4,18],
		/* 7*/[4,08],
		/* 8*/[3,28],
		/* 9*/[4,16],
		/*10*/[4,05],
		/*11*/[3,25],
		/*12*/[4,13],
		/*13*/[4,02],
		/*14*/[3,22],
		/*15*/[4,10],
		/*16*/[3,30],
		/*17*/[4,17],
		/*18*/[4,07],
		/*19*/[3,27]
];

/***********************************************************************/

	static isLeap(year){
/***********************************************************************
 Name: DateTime.isLeap
 Type: Function
 Purpose: test if the year is a leap year
 Return value:
   true if is leap year, false otherwise
***********************************************************************/
		return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
	}
/***********************************************************************/
	static nLeap(year){
		return Math.trunc((year%400)/4)-Math.trunc((year%400)/100)+Math.trunc(year/400)*97;
	}
/***********************************************************************/
	static nYDays(year){
		var ly = nLeap(year);
		return (365*(year-ly)+366*ly);
	}

	static monthOfDayOfYear(day,leap){
/***********************************************************************
 Name: DateTime.monthOfDayOfYear
 Type: Function
 Purpose: get the month of a day of year
 Return value:
   month of a day of year
***********************************************************************/
		for(var i=0; i<12; i++) {
			if (day<=DateTime.prototype.monthTable[i][leap?1:2]) break;
		}
		return i-1;
	}
	
	isUTCLeapYear(){
/***********************************************************************
 Name: DateTime.isUTCLeapYear
 Type: Function
 Purpose: test if the UTC year is a leap year
 Return value:
   true if is UTC leap year, false otherwise
***********************************************************************/
		return DateTime.isLeap(this.baseDate.getUTCFullYear());
	}

	isLocalLeapYear(){
/***********************************************************************
 Name: DateTime.isLocalLeapYear
 Type: Function
 Purpose: test if the Local year is a leap year
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		return DateTime.isLeap(this.baseDate.getFullYear());
	}
	
	getUTCMonthDays(){
/***********************************************************************
 Name: DateTime.isLocalLeapYear
 Type: Function
 Purpose: return UTC
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		if (this.isUTCLeapYear() && (this.baseDate.getUTCMonth()==1)) {
			return(29);
		}
		else {
			return DateTime.monthTable[this.baseDate.getUTCMonth()][0];
		}
	}

	getLocalMonthDays(){
/***********************************************************************
 Name: DateTime.isLocalLeapYear
 Type: Function
 Purpose: 
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		if (this.isLocalLeapYear() && (this.baseDate.getMonth()==1)) {
			return(29);
		}
		else {
			return DateTime.monthTable[this.baseDate.getMonth()][0];
		}
	}

	getUTCDayOfYear(){
/***********************************************************************
 Name: DateTime.getUTCDayOfYear
 Type: Function
 Purpose: 
 Return value:
   the number of days since start of year (integer)
***********************************************************************/
		return monthTable[this.baseDate.getUTCMonth()][this.isUTCLeapYear()?2:1]+this.baseDate.getUTCDate();
	}

	getLocalDayOfYear(){
/***********************************************************************
 Name: DateTime.getLocalDayOfYear
 Type: Function
 Purpose: 
 Return value:
   the number of days since start of year (integer)
***********************************************************************/
		return monthTable[this.baseDate.getMonth()][this.isLocalLeapYear()?2:1]+this.baseDate.getDate();
	}

	getJulianDay(){
/***********************************************************************
 Name: DateTime.getJulianDay
 Type: Function
 Purpose: convert DateTime object to Julian Day at noon
 Return value:
   the Julian Day corresponding to the Date (integer)
***********************************************************************/
		return Math.trunc(DateTime.DJ70+0.5+this.baseDate.getTime()/DateTime.DMS);
	}

	setJulianDay(j){
/***********************************************************************
 Name: DateTime.setJulianDay
 Type: Function
 Purpose: Convert Julian Day to DateTime object at midnight
 Return value:
   the Date (DateTime)
***********************************************************************/
		var d = this.baseDate.getTime()/DateTime.DMS;
		this.baseDate.setTime((Math.trunc(j-DateTime.DJ70-1) + (d - Math.trunc(d)))*DateTime.DMS);
		return this;
	}

	getUT(){
/***********************************************************************
 Name: DateTime.getUT
 Type: Function
 Purpose: convert DateTime object to UT
 Return value:
   the UT corresponding to the Date (float)
***********************************************************************/
		var d = this.baseDate.getTime()/DateTime.DMS;
		return (d - Math.trunc(d))*24.0;
	}

	setUT(t){
/***********************************************************************
 Name: DateTime.setUT
 Type: Function
 Purpose: Set UT to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime((Math.trunc(this.baseDate.getTime()/DateTime.DMS)+t/24.0)*DateTime.DMS);
		return this;
	}

	getLT(){
/***********************************************************************
 Name: DateTime.getLT
 Type: Function
 Purpose: convert DateTime object to LT (Local Time)
 Return value:
   the LT corresponding to the Date (float)
***********************************************************************/
		var d = this.baseDate.getTime()/DateTime.DMS;
		return (d - Math.trunc(d))*24.0-DateTime.LocalTZA()/60;
	}

	setLT(t){
/***********************************************************************
 Name: DateTime.setLT
 Type: Function
 Purpose: Set LT (Local Time) to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime((Math.trunc(this.baseDate.getTime()/DateTime.DMS)+t/24.0+DateTime.LocalTZA()/60)*DateTime.DMS);
		return this;
	}

	incGregorianYears(t){
/***********************************************************************
 Name: DateTime.incGregorianYears
 Type: Function
 Purpose: Increase gregorian years (365.2425 days) to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setTime(this.baseDate.getTime()+t*DateTime.DMS*DateTime.DGY);
		return this;
	}

	incJulianYears(t){
/***********************************************************************
 Name: DateTime.incJulianYears
 Type: Function
 Purpose: Increase julian years (365.25 days) to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setTime(this.baseDate.getTime()+t*DateTime.DMS*DateTime.DJY);
		return this;
	}

	incTropicalYears(t){
/***********************************************************************
 Name: DateTime.incJulianYears
 Type: Function
 Purpose: Increase tropical years to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setTime(this.baseDate.getTime()+t*DateTime.DMS*DateTime.DTY);
		return this;
	}

	incYear(t){
/***********************************************************************
 Name: DateTime.incYears
 Type: Function
 Purpose: Increase years to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCFullYear(this.baseDate.getUTCFullYear()+t);
		return this;
	}

	incMonth(t){
/***********************************************************************
 Name: DateTime.incYears
 Type: Function
 Purpose: Increase years to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCMonth(this.baseDate.getUTCMonth()+t);
		return this;
	}

	incDate(t){
/***********************************************************************
 Name: DateTime.incDate
 Type: Function
 Purpose: Increase days to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCDate(this.baseDate.getUTCDate()+t);
		return this;
	}

	incHours(t){
/***********************************************************************
 Name: DateTime.incHours
 Type: Function
 Purpose: Increase hours to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCHours(this.baseDate.getUTCHours()+t);
		return this;
	}

	incMinutes(t){
/***********************************************************************
 Name: DateTime.incMinutes
 Type: Function
 Purpose: Increase minutes to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCMinutes(this.baseDate.getUTCMinutes()+t);
		return this;
	}

	incSeconds(t){
/***********************************************************************
 Name: DateTime.incSeconds
 Type: Function
 Purpose: Increase seconds to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCSeconds(this.baseDate.getUTCSeconds()+t);
		return this;
	}

	incMilliseconds(t){
/***********************************************************************
 Name: DateTime.incMilliseconds
 Type: Function
 Purpose: Increase milliseconds to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
		this.baseDate.setUTCMilliseconds(this.baseDate.getUTCMilliseconds()+t);
		return this;
	}

	static julianDate(utc){
/***********************************************************************
 Name: DateTime.julianDate
 Type: Function
 Purpose: convert argument to Julian Date
 Return value:
   the Julian Date corresponding to the Date (float)
***********************************************************************/
		
		return DateTime.DJ70+utc.getTime()/DateTime.DMS;
	}

	getJulianDate(){
/***********************************************************************
 Name: DateTime.getJulianDate
 Type: Function
 Purpose: convert DateTime object to Julian Date
 Return value:
   the Julian Date corresponding to the Date (float)
***********************************************************************/
		return DateTime.julianDate(this.baseDate);
	}

	setJulianDate(j){
/***********************************************************************
 Name: DateTime.setJulianDate
 Type: Function
 Purpose: Convert Julian Date to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime((j-DateTime.DJ70)*DateTime.DMS);
		return this;
	}

	static modifiedJulianDate(utc){
/***********************************************************************
 Name: DateTime.modifiedJulianDate
 Type: Function
 Purpose: convert DateTime object to Julian Date
 Return value:
   the Modified Julian Date corresponding to the Date (float)
***********************************************************************/
		return DateTime.DJM70+utc.getTime()/DateTime.DMS;
	}

	getModifiedJulianDate(){
/***********************************************************************
 Name: DateTime.getModifiedJulianDate
 Type: Function
 Purpose: convert DateTime object to Julian Date
 Return value:
   the Modified Julian Date corresponding to the Date (float)
***********************************************************************/
		return DateTime.modifiedJulianDate(this.baseDate);
	}

	setModifiedJulianDate(j){
/***********************************************************************
 Name: DateTime.setModifiedJulianDate
 Type: Function
 Purpose: Convert Modified Julian Date to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime((j-DateTime.DJM70)*DateTime.DMS);
		return this;
	}

	static J2000(utc){
/***********************************************************************
 Name: DateTime.J2000
 Type: Function
 Purpose: Convert DateTime object to Century
 Return value:
   The number of days since 1/Jan/2000 12:00 UTC (float)
***********************************************************************/
        // The number of days since 1/Jan/2000 12:00 UTC (float)
        return (utc.getTime() - DateTime.M7020) / DateTime.DMS;
	}

//http://www.stjarnhimlen.se/comp/ppcomp.html
//1999 Dec 31, 0:00 UT
	static dayNumber(utc){
        return (utc.getTime() - Date.UTC(1999,11,31)) / DateTime.DMS;
	}
	getDayNumber(){
			return DateTime.dayNumber(this.baseDate);
	}


	getJulianCentury(){
/***********************************************************************
 Name: DateTime.getJulianCentury
 Type: Function
 Purpose: Convert DateTime object to Century
 Return value:
   The century since J2000.0 corresponding to the Date (float)
***********************************************************************/
		return (this.baseDate.getTime()/DateTime.DMS - DateTime.D7020)/DateTime.DJC;
//		return (this.baseDate.getTime() - Date.UTC(2000,0,1,12))/DateTime.DMS/DateTime.DJC;
//		return DateTime.J2000(this.baseDate) / DateTime.DJC;
	}

	setJulianCentury(c){
/***********************************************************************
 Name: DateTime.setJulianCentury
 Type: Function
 Purpose: Convert Julian Century to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime((c * DateTime.DJC + DateTime.D7020)*DateTime.DMS);
		return this;
	}

	getJulianEpoch(){
/***********************************************************************
 Name: DateTime.getJulianEpoch
 Type: Function
 Purpose: Convert DateTime object to Julian Epoch.
 Return value:
   the Julian Epoch corresponding to the Date (float)
***********************************************************************/
		return (2000.0 + (this.baseDate.getTime()/DateTime.DMS - DateTime.D7020) / DateTime.DJY);
	}

	setJulianEpoch(e){
/***********************************************************************
 Name: DateTime.setJulianEpoch
 Type: Function
 Purpose: Convert Julian Epoch to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(((e - 2000.0) * DateTime.DJY + DateTime.D7020) * DateTime.DMS);
		return this;
	}

	getBesselianEpoch(){
/***********************************************************************
 Name: DateTime.getBesselianEpoch
 Type: Function
 Purpose: Convert DateTime object to Besselian Epoch
 Return value:
   the Besselian Epoch corresponding to the Date (float)
***********************************************************************/
		return (1900.0 + (this.baseDate.getTime()/DateTime.DMS + 25567.18648 ) / DateTime.DTY);
	}

	setBesselianEpoch(e){
/***********************************************************************
 Name: DateTime.setBesselianEpoch
 Type: Function
 Purpose: Convert Besselian Epoch to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(((e - 1900.0) * DateTime.DTY - 25567.18648) * DateTime.DMS);
		return this;
	}

	getEpoch(){
/***********************************************************************
 Name: DateTime.getEpoch
 Type: Function
 Purpose: Convert DateTime object to Besselian Epoch if before 1984, Julian Epoch otherise
 Return value:
   the Epoch corresponding to the Date (float)
***********************************************************************/
		if (this.baseDate.getUTCFullYear()<1984.0) {
			return this.getBesselianEpoch();
		}
		else {
			return this.getJulianEpoch();
		}
	}

	setEpoch(e){
/***********************************************************************
 Name: DateTime.setEpoch
 Type: Function
 Purpose: Convert DateTime object to Besselian Epoch if before 1984, Julian Epoch otherise
 Return value:
   the Epoch corresponding to the Date (float)
***********************************************************************/
		if (e<1984.0) {
			this.setBesselianEpoch(e);
		}
		else {
			this.setJulianEpoch(e);
		}
		return this;
	}

	TTtoTAI(){
/***********************************************************************
 Name: DateTime.TTtoTAI
 Type: Function
 Purpose: Convert Terrestrial Time, TT, to International Atomic Time, TAI.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(this.baseDate.getTime()-DateTime.TTMTAIMS);
		return this;
	}

	TAItoTT(){
/***********************************************************************
 Name: DateTime.TAItoTT
 Type: Function
 Purpose: Convert International Atomic Time, TAI, to Terrestrial Time, TT.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.baseDate.setTime(this.baseDate.getTime()+DateTime.TTMTAIMS);
		return this;
	}

	getDeltaAT(){
/***********************************************************************
 Name: DateTime.getDeltaAT
 Type: Function
 Purpose: For a given UTC date, calculate Delta(AT) = TAI-UTC.
 Return value:
   TAI minus UTC in seconds (float).
***********************************************************************/
	/* Release year for this version of dat */
	const IYV = 2017;
	/* Reference dates (MJD) and drift rates (s/day), pre leap seconds */
	const drift = [
		[ 37300.0, 0.0012960 ],
		[ 37300.0, 0.0012960 ],
		[ 37300.0, 0.0012960 ],
		[ 37665.0, 0.0011232 ],
		[ 37665.0, 0.0011232 ],
		[ 38761.0, 0.0012960 ],
		[ 38761.0, 0.0012960 ],
		[ 38761.0, 0.0012960 ],
		[ 38761.0, 0.0012960 ],
		[ 38761.0, 0.0012960 ],
		[ 38761.0, 0.0012960 ],
		[ 38761.0, 0.0012960 ],
		[ 39126.0, 0.0025920 ],
		[ 39126.0, 0.0025920 ]
	];
	/* Dates and Delta(AT)s */
   const changes = [
		[ 1960,  1,  1.4178180 ],
		[ 1961,  1,  1.4228180 ],
		[ 1961,  8,  1.3728180 ],
		[ 1962,  1,  1.8458580 ],
		[ 1963, 11,  1.9458580 ],
		[ 1964,  1,  3.2401300 ],
		[ 1964,  4,  3.3401300 ],
		[ 1964,  9,  3.4401300 ],
		[ 1965,  1,  3.5401300 ],
		[ 1965,  3,  3.6401300 ],
		[ 1965,  7,  3.7401300 ],
		[ 1965,  9,  3.8401300 ],
		[ 1966,  1,  4.3131700 ],
		[ 1968,  2,  4.2131700 ],
		[ 1972,  1, 10.0       ],
		[ 1972,  7, 11.0       ],
		[ 1973,  1, 12.0       ],
		[ 1974,  1, 13.0       ],
		[ 1975,  1, 14.0       ],
		[ 1976,  1, 15.0       ],
		[ 1977,  1, 16.0       ],
		[ 1978,  1, 17.0       ],
		[ 1979,  1, 18.0       ],
		[ 1980,  1, 19.0       ],
		[ 1981,  7, 20.0       ],
		[ 1982,  7, 21.0       ],
		[ 1983,  7, 22.0       ],
		[ 1985,  7, 23.0       ],
		[ 1988,  1, 24.0       ],
		[ 1990,  1, 25.0       ],
		[ 1991,  1, 26.0       ],
		[ 1992,  7, 27.0       ],
		[ 1993,  7, 28.0       ],
		[ 1994,  7, 29.0       ],
		[ 1996,  1, 30.0       ],
		[ 1997,  7, 31.0       ],
		[ 1999,  1, 32.0       ],
		[ 2006,  1, 33.0       ],
		[ 2009,  1, 34.0       ],
		[ 2012,  7, 35.0       ],
		[ 2015,  7, 36.0       ],
		[ 2017,  1, 37.0       ]
	];
	/* Miscellaneous local variables */
	var iy = this.baseDate.getUTCFullYear();
	var im = this.baseDate.getUTCMonth()+1;
	var j = 0, i, m;
	var da = 0.0;
	/* If pre-UTC year, set warning status and give up. */
	if (iy < changes[0][0]) j = 1;
	else {
		/* If suspiciously late year, set warning status but proceed. */
		if (iy > IYV + 5) j = 1;
		/* Combine year and month to form a date-ordered integer... */
		m = 12*iy + im;
		/* ...and use it to find the preceding table entry. */
		for (i = changes.length-1; i >=0; i--) {
			if (m >= (12 * changes[i][0] + changes[i][1])) break;
		}
		/* Prevent underflow warnings. */
		if (i < 0) {
			j = -5;
		}
		else {
			/* Get the Delta(AT). */
			da = changes[i][2];
			/* If pre-1972, adjust for drift. */
			if (i < drift.length) da += (this.getModifiedJulianDate() + 1.5 - drift[i][0]) * drift[i][1];
		}
	}
	/* Return [status,Delta(AT) value]. */
	return [j, da];
}

	UTCtoTAI(){
/***********************************************************************
 Name: DateTime.UTCtoTAI
 Type: Function
 Purpose: Convert DateTime object from UTC to International Atomic Time, TAI.
 Return value:
   status
***********************************************************************/
		var da = this.getDeltaAT();
		if (da[0]>=0) this.baseDate.setTime(this.baseDate.getTime()+da[1]*1e3);
		return this;
	}

	TAItoUTC(){
/***********************************************************************
 Name: DateTime.TAItoUTC
 Type: Function
 Purpose:Convert DateTime object from International Atomic Time, TAI, to UTC.
 Return value:
   status
***********************************************************************/
		var da = this.getDeltaAT();
		if (da[0]>=0) this.baseDate.setTime(this.baseDate.getTime()-da[1]*1e3);
		return this;
	}

	TTtoTCG(){
/***********************************************************************
 Name: DateTime.TTtoTCG
 Type: Function
 Purpose: Convert DateTime object from Terrestrial Time, TT, to Geocentric
  Coordinate Time, TCG.
 Return value:
   status
***********************************************************************/
		/* TT to TCG rate */
		var elgg = DateTime.ELG/(1.0-DateTime.ELG);
		var tt = this.getModifiedJulianDate();
		this.setModifiedJulianDate(tt + ( tt - 43144.0003725 ) * elgg);
		return this;
	}

	TCGtoTT(){
/***********************************************************************
 Name: DateTime.TCGtoTT
 Type: Function
 Purpose: Convert DateTime object Geocentric Coordinate Time, TCG, to
   Terrestrial Time, TT.
 Return value:
   status
***********************************************************************/
		var tcg = this.getModifiedJulianDate();
		this.setModifiedJulianDate(tcg - ( tcg - 43144.0003725 ) * DateTime.ELG);
		return this;
	}


/***********************************************************************/
}

console.logDateTime = function(dtz) {
	console.log(dtz);
	console.log(dtz.baseDate);
	console.log("getTimezoneString(): "+dtz.getTimezoneString());
	console.log("valueOf(): "+dtz.valueOf());
	console.log("getIsLocal(): "+dtz.getIsLocal());
	console.log("getLocalTZAOffset(): "+dtz.getLocalTZOffset());
	console.log("getDSTOffset(): "+dtz.getDSTOffset());
	console.log("getTimezoneOffset(): "+dtz.getTimezoneOffset());
	console.log("getLocalDay(): "+dtz.getLocalDay());
	console.log("getJulianCentury(): "+dtz.getJulianCentury());
	console.log("toDateString(): "+dtz.toDateString());
	console.log("toGMTString(): "+dtz.toGMTString());
	console.log("toISOString(): "+dtz.toISOString());
	console.log("toJSON(): "+dtz.toJSON());
	console.log("toLocaleDateString(): "+dtz.toLocaleDateString());
	console.log("toLocaleTimeString(): "+dtz.toLocaleTimeString());
	console.log("toLocaleTimeStringAMPM(): "+dtz.toLocaleTimeStringAMPM());
	console.log("toLocaleString(): "+dtz.toLocaleString());
	console.log("toString(): "+dtz.toString());
	console.log("toTimeString(): "+dtz.toTimeString());
	console.log("toUTCString(): "+dtz.toUTCString());
	console.log("===============================");
}