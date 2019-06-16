/***********************************************************************
 JavaScript Math Object Polyfill
 
 Copyright (c) 2017 Sergio Lindau

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
 Name:    Math.PI2
 Type:    Property
 Value: The Math.PI2 property represents two pi.
***********************************************************************/
Math.PI2 = Math.PI2 || 2*Math.PI;

/***********************************************************************
 Name:    Math.RADEG
 Type:    Property
 Value: The Math.RADEG property represents the conversion factor from radians to degrees.
***********************************************************************/
Math.RADEG = Math.RADEG || 180.0/Math.PI;

/***********************************************************************
 Name:    Math.DEGRAD
 Type:    Property
 Value: The Math.DEGRAD property represents the conversion factor from degrees to radians.
***********************************************************************/
Math.DEGRAD = Math.DEGRAD || (Math.PI/180.0);

/***********************************************************************
 Name:    Math.R2AS
 Type:    Property
 Value: The Math.R2AS property represents the conversion factor from radians to arc seconds.
***********************************************************************/
Math.R2AS = Math.R2AS || (Math.RADEG*60*60);

/***********************************************************************
 Name:    Math.AS2R
 Type:    Property
 Value: The Math.AS2R property represents the conversion factor from arc seconds to radians.
***********************************************************************/
Math.AS2R = Math.AS2R || (Math.DEGRAD/(60*60));

/***********************************************************************
 Name:    Math.DS2R
 Type:    Property
 Value: The Math.DS2R property represents the conversion factor from seconds of time to radians.
***********************************************************************/
Math.DS2R = Math.DS2R || (Math.PI/(12*60*60));

/***********************************************************************
 Name:    Math.TURNAS
 Type:    Property
 Value: The Math.TURNAS property represents the number of arc seconds in a full circle.
***********************************************************************/
Math.TURNAS = Math.TURNAS || 360.0*60*60;

Math.R2H = Math.R2H || 12.0 / Math.PI;
Math.H2R = Math.H2R || Math.PI / 12.0;

Math.rad2deg = Math.rad2deg || function(x) {
/***********************************************************************
 Name:    Math.rad2deg
 Type:    Function
 Purpose: Converts radians to degrees.
 Arguments:
   x : A number.
 Return value:
   A number converted from radians to degrees.
***********************************************************************/
	return this.RADEG * x;
};

Math.deg2rad = Math.deg2rad || function(x) {
/***********************************************************************
 Name:    Math.deg2rad
 Type:    Function
 Purpose: Converts degrees to radians.
 Arguments:
   x : A number.
 Return value:
   A number converted from degrees to radians.
***********************************************************************/
	return this.DEGRAD * x;
};

Math.acosh = Math.acosh || function(x) {
/***********************************************************************
 Name:    Math.acosh
 Type:    Function
 Purpose: Returns the inverse hyperbolic cosine of a number x.
 Arguments:
   x : A number.
 Return value:
   A number representing the inverse hyperbolic cosine of a number x.
***********************************************************************/
	return this.log(x + this.sqrt(x * x - 1));
};

Math.asinh = Math.asinh || function(x) {
/***********************************************************************
 Name:    Math.asinh
 Type:    Function
 Purpose: Returns the inverse hyperbolic sine of a number x.
 Arguments:
   x : A number.
 Return value:
   A number representing the inverse hyperbolic sine of a number.
***********************************************************************/
	if (x === -Infinity) {
		return x;
	} else {
		return this.log(x + this.sqrt(x * x + 1));
	}
};

Math.atanh = Math.atanh || function(x) {
/***********************************************************************
 Name:    Math.atanh
 Type:    Function
 Purpose: Returns the inverse hyperbolic tangent of a number x.
 Arguments:
   x : A number.
 Return value:
   A number representing the inverse hyperbolic tangent of a number x.
***********************************************************************/
	return this.log((1+x)/(1-x)) / 2;
};

Math.sinh = Math.sinh || function(x) {
/***********************************************************************
 Name:    Math.sinh
 Type:    Function
 Purpose: Returns the hyperbolic sine of a number x.
 Arguments:
   x : A number.
 Return value:
   A number representing the hyperbolic sine of a number x.
***********************************************************************/
  var y = this.exp(x);
  return (y - 1 / y) / 2;

};

Math.cosh = Math.cosh || function(x) {
/***********************************************************************
 Name:    Math.cosh
 Type:    Function
 Purpose: Returns the hyperbolic cosine of a number x.
 Arguments:
   x : A number.
 Return value:
   A number representing the hyperbolic cosine of a number x.
***********************************************************************/
  var y = this.exp(x);
  return (y + 1 / y) / 2;
};

Math.tanh = Math.tanh || function(x){
/***********************************************************************
 Name:    Math.tanh
 Type:    Function
 Purpose: Returns the hyperbolic tangent of a number x.
 Arguments:
   x : A number.
 Return value:
   A number representing the hyperbolic tangent of a number x.
***********************************************************************/
    var a = this.exp(+x), b = this.exp(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (a + b);
};

Math.sind = Math.sind || function(x) {
/***********************************************************************
 Name:    Math.sind
 Type:    Function
 Purpose: Returns the sine of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the sine of a number x in degrees.
***********************************************************************/
	return this.sin(x*this.DEGRAD);
};

Math.cosd = Math.cosd || function(x) {
/***********************************************************************
 Name:    Math.cosd
 Type:    Function
 Purpose: Returns the cosine of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the cosine of a number x in degrees.
***********************************************************************/
	return this.cos(x*this.DEGRAD);
};

Math.tand = Math.tand || function(x) {
/***********************************************************************
 Name:    Math.tand
 Type:    Function
 Purpose: Returns the tangent of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the tangent of a number x in degrees.
***********************************************************************/
	return this.tan(x*this.DEGRAD);
};

Math.sinhr = Math.sinhr || function(x) {
/***********************************************************************
 Name:    Math.sinhr
 Type:    Function
 Purpose: Returns the sine of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the sine of a number x in degrees.
***********************************************************************/
	return this.sin(x*this.H2R);
};

Math.coshr = Math.coshr || function(x) {
/***********************************************************************
 Name:    Math.coshr
 Type:    Function
 Purpose: Returns the cosine of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the cosine of a number x in degrees.
***********************************************************************/
	return Math.cos(x*this.H2R)
};

Math.tanhr = Math.tanhr || function(x) {
/***********************************************************************
 Name:    Math.tanhr
 Type:    Function
 Purpose: Returns the tangent of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the tangent of a number x in degrees.
***********************************************************************/
	return this.tan(x*this.H2R);
};

Math.asind = Math.asind || function(x) {
/***********************************************************************
 Name:    Math.asind
 Type:    Function
 Purpose: Returns the arcsine of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the arcsine of a number x in degrees.
***********************************************************************/
	return this.RADEG*this.asin(x);
};

Math.acosd = Math.acosd || function(x) {
/***********************************************************************
 Name:    Math.acosd
 Type:    Function
 Purpose: Returns the arccosine of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the arccosine of a number x in degrees.
***********************************************************************/
	return this.RADEG*this.acos(x);
};

Math.atand = Math.atand || function(x) {
/***********************************************************************
 Name:    Math.atand
 Type:    Function
 Purpose: Returns the arctangent of a number x.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the arctangent of a number x in degrees.
***********************************************************************/
	return this.RADEG*this.atan(x);
};

Math.atan2d = Math.atan2d || function(x,y) {
/***********************************************************************
 Name:    Math.atan2d
 Type:    Function
 Purpose: Returns the arctangent of the quotient of its arguments.
 Arguments:
   x : A number.
   y : A number.
 Return value:
   A number representing the arctangent of a quotient of its arguments in degrees.
***********************************************************************/
	return this.RADEG*this.atan2(x,y);
};

Math.mod = Math.mod || function(x,r) {
/***********************************************************************
 Name:    Math.mod
 Type:    Function
 Purpose: Returns the normalization of an arbitrary value.
 Arguments:
   x : A number.
   r : A number.
 Return value:
   A number representing the x modulus r. Normalizes the value in the [0, r) interval. 
***********************************************************************/
	return x - this.floor(x/r)*r;
};


Math.revd = Math.revd || function(x) {
/***********************************************************************
 Name:    Math.revd
 Type:    Function
 Purpose: Returns the Revolution normalization in degrees.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the x modulus 360. Normalizes the angle in the [0º, 360º) interval. 
***********************************************************************/
	return x - this.floor(x/360.0)*360.0;
};

Math.modd = Math.modd || function(x) {
/***********************************************************************
 Name:    Math.modd
 Type:    Function
 Purpose: Returns the Revolution normalization balanced in degrees.
 Arguments:
   x : A number (in degrees).
 Return value:
   A number representing the Revolution normalization balanced in degrees. Normalizes the angle in the (-180º, 180º] interval.
***********************************************************************/
	x = this.revd(x);
	var y = this.abs(x);
	if (y>180) return this.sign(x)*-1*(360-y)
	else return x;
};

Math.revr = Math.revr || function(x) {
/***********************************************************************
 Name:    Math.revr
 Type:    Function
 Purpose: Returns the Revolution normalization in radians.
 Arguments:
   x : A number (in radians).
 Return value:
   A number representing the x modulus 2*Math.PI. Normalizes the angle in the [0, 2*Math.PI) interval. 
***********************************************************************/
	return x - this.floor(x/(2*this.PI))*2*this.PI;
};

Math.modr = Math.modr || function(x) {
/***********************************************************************
 Name:    Math.modr
 Type:    Function
 Purpose: Returns the Revolution normalization balanced in radians.
 Arguments:
   x : A number (in radians).
 Return value:
   A number representing the Revolution normalization balanced in radians. Normalizes the angle in the (-Maty.PI, Math.PI] interval.
***********************************************************************/
	x = this.revr(x);
	var y = this.abs(x);
	if (y>this.PI) return this.sign(x)*-1*(2*this.PI-y)
	else return x;
};

Math.imul = Math.imul || function(a, b) {
/***********************************************************************
 Name:    Math.imul
 Type:    Function
 Purpose: Returns the result of the C-like 32-bit multiplication of the two parameters.
 Arguments:
   a : A number.
   b : A number.
 Return value:
   A number representing the result of the C-like 32-bit multiplication of the two parameters.
***********************************************************************/
  var ah = (a >>> 16) & 0xffff;
  var al = a & 0xffff;
  var bh = (b >>> 16) & 0xffff;
  var bl = b & 0xffff;
  // the shift by 0 fixes the sign on the high part
  // the final |0 converts the unsigned value into a signed value
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
};

Math.hypot = Math.hypot || function() {
/***********************************************************************
 Name:    Math.hypot
 Type:    Function
 Purpose: Returns the approximation of the square root of the sum of squares of its arguments.
 Arguments:
   x : A number.
 Return value:
   A number representing the approximation of the square root of the sum of squares of its arguments.
***********************************************************************/
  var y = 0;
  var length = arguments.length;

  for (var i = 0; i < length; i++) {
    if (arguments[i] === Infinity || arguments[i] === -Infinity) {
      return Infinity;
    }
    y += arguments[i] * arguments[i];
  }
  return this.sqrt(y);
};

Math.polynomial = Math.polynomial || function(coef,x){
/***********************************************************************
 Name:    Math.polynomial
 Type:    Function
 Purpose: Returns the polynom.
 Arguments:
   x : A number.
 Return value:
   A number representing the Returns the polynom.
***********************************************************************/
	switch (coef.length){
		case 0: return 0;
		case 1: return coef[0];
		case 2: return coef[0]+coef[1]*x;
		case 3: return coef[0]+coef[1]*x+coef[2]*x*x;
		case 4: return coef[0]+coef[1]*x+coef[2]*x*x+coef[3]*x*x*x;
		default:
			var result = coef[0]+coef[1]*x+coef[2]*x*x+coef[3]*x*x*x;
			for (var i=4; i < coef.length; i++) result += coef[i]*this.pow(x,i);
			return result;
	}
};

Math.polymultial = Math.polymultial || function(coef,x){
/***********************************************************************
 Name:    Math.polymultial
 Type:    Function
 Purpose: Returns the Returns the polynom.
 Arguments:
   x : A number.
 Return value:
   A number representing the Returns the polynom.
***********************************************************************/
	return 1;
};

Math.clz32 = Math.clz32 || function(x) {
/***********************************************************************
 Name:    Math.clz32
 Type:    Function
 Purpose: Returns the number of leading zero bits in the 32-bit binary representation of a number.
 Arguments:
   x : A number.
 Return value:
   A number representing the number of leading zero bits in the 32-bit binary representation of a number.
***********************************************************************/
  // Let n be ToUint32(x).
  // Let p be the number of leading zero bits in 
  // the 32-bit binary representation of n.
  // Return p.    
  if (x == null || x === 0) {
    return 32;
  }
  return 31 - this.floor(this.log(x >>> 0) * this.LOG2E);
};

Math.fround = Math.fround || function(x) {
/***********************************************************************
 Name:    Math.fround
 Type:    Function
 Purpose: Returns the nearest single precision float representation of a number.
 Arguments:
   x : A number.
 Return value:
   A number representing the nearest single precision float representation of a number.
***********************************************************************/
	return x;
};

Math.frac = Math.frac || function(x){
/***********************************************************************
 Name:    Math.frac
 Type:    Function
 Purpose: Returns the fractional part of x.
 Arguments:
   x : A number.
 Return value:
   A number representing the sign of the given argument. If the argument is a positive number, negative number or zero, the function will return 1, -1, or 0 respectively. Otherwise, NaN is returned.
***********************************************************************/
	var f = Number("0."+((x+"").split(".")[1])+"0");
	return (isNaN(f))?0:f;
};

Math.sgn = Math.sgn || function(x,y) {
/***********************************************************************
 Name:    Math.sgn
 Type:    Function
 Purpose: Returns absolute value of x with sign of y.
 Arguments:
   x : A number.
 Return value:
   A number representing the absolute value of x with sign of y.
***********************************************************************/
	return (y<0)?-this.abs(x):this.abs(x);
};

Math.sign = Math.sign || function(x) {
/***********************************************************************
 Name:    Math.sign
 Type:    Function
 Purpose: Returns the sign of a number, indicating whether the number is positive, negative or zero.
 Arguments:
   x : A number.
 Return value:
   A number representing the sign of the given argument. If the argument is a positive number, negative number or zero, the function will return 1, -1, or 0 respectively. Otherwise, NaN is returned.
***********************************************************************/
	return ((x > 0) - (x < 0)) || +x;
};

Math.trunc = Math.trunc || function(x) {
/***********************************************************************
 Name:    Math.trunc
 Type:    Function
 Purpose: Returns the integral part of the number x, removing any fractional digits. If x is already an integer, the result is x. (truncate to nearest whole number towards zero)
 Arguments:
   x : A number.
 Return value:
   A number representing the integral part of the number x, removing any fractional digits. If x is already an integer, the result is x.
***********************************************************************/
  var n = x - x%1;
  return n===0 && (x<0 || (x===0 && (1/x !== 1/0))) ? -0 : n;
};

Math.near = Math.near || function(x) {
/***********************************************************************
 Name:    Math.near
 Type:    Function
 Purpose: Returns the x round to nearest whole number.
 Arguments:
   x : A number.
 Return value:
   A number representing the x round to nearest whole number.
***********************************************************************/
	if (isNaN(x)) return NaN;
	return (x<0)?this.ceil(x-0.5):this.floor(x+0.5);
};

Math.decimalAdjust = Math.decimalAdjust || function(type, value, exp) {
/***********************************************************************
 Name:    Math.decimalAdjust
 Type:    Function
 Purpose: Returns the decimal adjustment of a number.
 Arguments:
   type : The type of adjustment.
   value : The number.
   exp : The exponent (the 10 logarithm of the adjustment base).
 Return value:
   A number representing the adjusted value.
***********************************************************************/
	// If the exp is undefined or zero...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
};
/***********************************************************************
 Implements Math.ceil10, Math.floor10, Math.near10, Math.round10, Math.trunc10
***********************************************************************/
Math.ADJUSTF = ['ceil','floor', 'near','round','trunc'];
// Closure
(function(){
		for(var i=0; i<Math.ADJUSTF.length; i++)
			eval("Math['"+Math.ADJUSTF[i]+"'+'10']=function(value,exp){\n\t/* Math."+Math.ADJUSTF[i]+"10 adjust function */\n\treturn Math.decimalAdjust('"+Math.ADJUSTF[i]+"', value, exp);\n};");
	})();


Math.cbrt = Math.cbrt || function(x) {
/***********************************************************************
 Name:    Math.cbrt
 Type:    Function
 Purpose: Returns the aproximation to the cube root of x.
 Arguments:
   x : A number.
 Return value:
   A number representing the approximation to the cube root of x.
***********************************************************************/
	var y = this.pow(this.abs(x), 1/3);
	return x < 0 ? -y : y;
};

Math.root = Math.root || function(n,x) {
/***********************************************************************
 Name:    Math.root
 Type:    Function
 Purpose: Returns the n-th root of the given argument x.
 Arguments:
   x : A number.
 Return value:
   A number representing the n-th root of the given argument x.
***********************************************************************/
	if (arguments.length > 1) {
		if (n!=2)
			return this.pow(x, 1 / n);
		else return this.sqrt(x);
	}
	else return this.sqrt(arguments[0]);
};

Math.expm1 = Math.expm1 || function(x) {
/***********************************************************************
 Name:    Math.expm1
 Type:    Function
 Purpose: Returns the approximation to subtracting 1 from the exponential function of x.
 Arguments:
   x : A number.
 Return value:
   A number representing the approximation to subtracting 1 from the exponential function of x.
***********************************************************************/
	return this.exp(x) - 1;
};

Math.log10 = Math.log10 || function(x) {
/***********************************************************************
 Name:    Math.log10
 Type:    Function
 Purpose: Returns the approximation to the base 10 logarithm of x.
 Arguments:
   x : A number.
 Return value:
   A number representing the approximation to the base 10 logarithm of x.
***********************************************************************/
	return this.log(x) / this.LN10;
};

Math.log2 = Math.log2 || function(x) {
/***********************************************************************
 Name:    Math.log2
 Type:    Function
 Purpose: Returns the approximation to the base 2 logarithm of x.
 Arguments:
   x : A number.
 Return value:
   A number representing the approximation to the base 2 logarithm of x.
***********************************************************************/
	return this.log(x) / this.LN2;
};

Math.log1p = Math.log1p || function(x) {
/***********************************************************************
 Name:    Math.log1p
 Type:    Function
 Purpose: Returns the approximation to the natural logarithm of 1 + x. 
 Arguments:
   x : A number.
 Return value:
   A number representing the approximation to the natural logarithm of 1 + x. 
***********************************************************************/
  return this.log(1 + x);
};

Math.logarithm = Math.logarithm || function(b,x) {
/***********************************************************************
 Name:    Math.logarithm
 Type:    Function
 Purpose: Returns the base b logarithm of a number x.
 Arguments:
   b : A number. [optional]
   x : A number.
 Return value:
   A number representing the base b logarithm of a number x. if b is
   omitted the default base is 10.
***********************************************************************/
	if (arguments.length == 1) {
		// Math.logarithm(x)    /* base 10 logarithm */
		return this.log(b) / this.LN10;
	}
	else if (arguments.length == 2) {
		// Math.logarithm(b,x)
		if (b == 2) { return this.log(x) / this.LN2;    /* base 2 logarithm */ }
		else if (b == 10) { return this.log(x) / this.LN10;    /* base 10 logarithm */ }
		else if (b == this.E) { return this.log(x);    /* natural logarithm */ }
		else return this.log(x) / this.log(b);    /* base b logarithm */
	}
	else return Number('NaN');
};

if (!Math.factorial) {
	Math.FACTSEQ = [1];
	Math.GFACTPRE = 100;
	Math.factorial = function() {
/***********************************************************************
 Name:    Math.factorial
 Type:    Function
 Purpose: Returns the number representing the factorial of x.
 Arguments:
   x : A number.
 Return value:
   A number representing the representing the factorial of x.
***********************************************************************/
		if (arguments.length > 0) {
			var arg = this.round(arguments[0]);
			if (arg < this.GFACTPRE) {
				if (arg >= this.FACTSEQ.length) {
					while (this.FACTSEQ.length <= arg + 1)
						this.FACTSEQ[this.FACTSEQ.length] = this.FACTSEQ[this.FACTSEQ.length - 1] * this.FACTSEQ.length;
				}
				return this.FACTSEQ[arg];
			} else {
				if (this.FACTSEQ.length < this.GFACTPRE) {
					while (this.FACTSEQ.length <= this.GFACTPRE)
						this.FACTSEQ[this.FACTSEQ.length] = this.FACTSEQ[this.FACTSEQ.length - 1] * this.FACTSEQ.length;
				}
				var temp = this.FACTSEQ[this.GFACTPRE - 1];
				for (var i = this.GFACTPRE; i <= arg; i++)
					temp = temp * i;
				return temp;
			}
		} else {
			return Number('NaN');
		}
	};
};

Math.binomial = Math.binomial || function(n,k) {
/***********************************************************************
 Name:    Math.binomial
 Type:    Function
 Purpose: Returns the number representing the binomial (n,k).
 Arguments:
   n : A integer.
   k : A integer.
 Return value:
   A number representing the binomial (n,k).
***********************************************************************/
		if (arguments.length == 2)
			return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
		else
			return Number('NaN');
};

Math.toSource = Math.toSource || function() {
/***********************************************************************
 Name:    Math.toSource
 Type:    Function
 Purpose: Returns the string 'Math'. This API has not been standardized.
 Return value:
   The string 'Math'.
***********************************************************************/
	return 'Math';
};
