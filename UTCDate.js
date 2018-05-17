/***********************************************************************
 JavaScript UTCDate Object
 Date object extensions for astronomy calculations
 
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


function UTCDate(a, b, c, d, e, f, g) {
/***********************************************************************
 Name: UTCDate
 Type: Constructor
 Purpose: convert UTCDate object to Julian Date
 Return value:
   the UTCDate corresponding to the arguments.
***********************************************************************/
	var larg;
	if (arguments.length>7) larg = arguments[7].toString().trim().toLowerCase();
	var x;
	switch (arguments.length) {
    case 0:
		x = new Date();
		break;
    case 1:
		if (Math.abs(a)<=4800) {
			x = new Date(Date.UTC(a,0,1,12,0,0,0));
		}
		else {
			x = new Date(a);
		}
      break;
    case 2:
		x = new Date(Date.UTC(a,b,1,12,0,0,0));
      break;
    case 3:
		x = new Date(Date.UTC(a,b,c,12,0,0,0));
      break;
    case 4:
		x = new Date(Date.UTC(a,b,c,d,0,0,0));
      break;
    case 5:
		x = new Date(Date.UTC(a,b,c,d,e,0,0));
      break;
    case 6:
		x = new Date(Date.UTC(a,b,c,d,e,f,0));
      break;
    case 7:
		x = new Date(Date.UTC(a,b,c,d,e,f,g));
      break;
    default:
		if (larg=="local") x = new Date(a, b, c, d, e, f, g)
		else if (larg=="utc") x = new Date(Date.UTC(a,b,c,d,e,f,g));
	}
	x.__proto__ = UTCDate.prototype;
	return x;
}

UTCDate.prototype.__proto__ = Date.prototype;

UTCDate.prototype.copy = function(){
/***********************************************************************
 Name: UTCDate.copy
 Type: Function
 Purpose: Create a copy of UTCDate date object.
 Return value:
   the copy of UTCDate (UTCDate)
***********************************************************************/
		var d = new UTCDate();
		d.setTime(this.getTime());
		return d;
	};

UTCDate.prototype.setNow = function(){
/***********************************************************************
 Name: UTCDate.setNow
 Type: Function
 Purpose: Set UTCDate to now.
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(Date.now());
		return this;
	};

UTCDate.prototype.setUTC = function(a,b,c,d,e,f,g){
/***********************************************************************
 Name: UTCDate.setUTC
 Type: Function
 Purpose: Set UTCDate object, with UTC arguments, like constructor.
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(Date.UTC(a,b,c,d,e,f,g));
		return this;
	};

UTCDate.prototype.setLocal = function(a,b,c,d,e,f,g){
/***********************************************************************
 Name: UTCDate.setLocal
 Type: Function
 Purpose: Set UTCDate, with arguments in local offset, like constructor.
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(Date.UTC(a,b,c,d,e,f,g)+this.getTimezoneOffset()*6e4);
		return this;
	};



/***********************************************************************
          Date prototype extensions for calendar calculations
***********************************************************************/

/* Number of days in [i][0] each month, [i][1] cumulative at start of each month (non-leap year), [i][2] cumulative at start of each month (leap year)  */
UTCDate.prototype.monthTable = [
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

UTCDate.prototype.getLocalDay = function(){
/***********************************************************************
 Name: UTCDate.getLocalDay
 Type: Function
 Purpose: return local day of week
 Return value:
   the 0-6 local day of week corresponding to sunday, monnday, ...
***********************************************************************/
		if (this.getUTCDate()==this.getDate()) {
			return this.getUTCDay();
		}
		else {
			var w = this.getUTCDay()-((this.getTimezoneOffset()>0)?1:0);
			if (w<0) w = 6;
			return w;
		}
	};

UTCDate.prototype.isLeap = function(y){
/***********************************************************************
 Name: UTCDate.isUTCLeapYear
 Type: Function
 Purpose: test if the UTC year is a leap year
 Return value:
   true if is UTC leap year, false otherwise
***********************************************************************/
		return (y % 4 == 0) && (y % 100 != 0 || y % 400 == 0);
	};
	
UTCDate.prototype.isUTCLeapYear = function(){
/***********************************************************************
 Name: UTCDate.isUTCLeapYear
 Type: Function
 Purpose: test if the UTC year is a leap year
 Return value:
   true if is UTC leap year, false otherwise
***********************************************************************/
		return this.isLeap(this.getUTCFullYear());
	};

UTCDate.prototype.isLocalLeapYear = function(){
/***********************************************************************
 Name: UTCDate.isLocalLeapYear
 Type: Function
 Purpose: test if the Local year is a leap year
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		return this.isLeap(this.getFullYear());
	};
	
UTCDate.prototype.getUTCMonthDays = function(){
/***********************************************************************
 Name: UTCDate.isLocalLeapYear
 Type: Function
 Purpose: test if the Local year is a leap year
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		if (this.isUTCLeapYear() && (this.getUTCMonth()==1)) {
			return(29);
		}
		else {
			return this.monthTable[this.getUTCMonth()][0];
		}
	};

UTCDate.prototype.getLocalMonthDays = function(){
/***********************************************************************
 Name: UTCDate.isLocalLeapYear
 Type: Function
 Purpose: test if the Local year is a leap year
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		if (this.isLocalLeapYear() && (this.getMonth()==1)) {
			return(29);
		}
		else {
			return this.monthTable[this.getMonth()][0];
		}
	};


/***********************************************************************
          Date prototype extensions for astronomy calculations
***********************************************************************/

UTCDate.prototype.getJulianDay = function(){
/***********************************************************************
 Name: UTCDate.getJulianDay
 Type: Function
 Purpose: convert UTCDate object to Julian Day at noon
 Return value:
   the Julian Day corresponding to the Date (integer)
***********************************************************************/
		return Math.trunc(2440588+this.getTime()/864e5);
	};

UTCDate.prototype.setJulianDay = function(j){
/***********************************************************************
 Name: UTCDate.setJulianDay
 Type: Function
 Purpose: Convert Julian Day to UTCDate object at midnight
 Return value:
   the Date (UTCDate)
***********************************************************************/
		var x = this.getTime()/864e5;
		this.setTime((Math.floor(j-2440586.5) + (x - Math.floor(x)))*864e5);
		return this;
	};

UTCDate.prototype.getUT = function(){
/***********************************************************************
 Name: UTCDate.getUT
 Type: Function
 Purpose: convert UTCDate object to UT
 Return value:
   the UT corresponding to the Date (float)
***********************************************************************/
		var x = this.getTime()/864e5;
		return (x - Math.floor(x))*24.0;
	};

UTCDate.prototype.setUT = function(t){
/***********************************************************************
 Name: UTCDate.setUT
 Type: Function
 Purpose: Set UT to UTCDate object
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime((Math.floor(this.getTime()/864e5)+t/24.0)*864e5);
		return this;
	};

UTCDate.prototype.getJulianDate = function(){
/***********************************************************************
 Name: UTCDate.getJulianDate
 Type: Function
 Purpose: convert UTCDate object to Julian Date
 Return value:
   the Julian Date corresponding to the Date (float)
***********************************************************************/
		return 2440587.5+this.getTime()/864e5;
	};

UTCDate.prototype.setJulianDate = function(j){
/***********************************************************************
 Name: UTCDate.setJulianDate
 Type: Function
 Purpose: Convert Julian Date to UTCDate object
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime((j-2440587.5)*864e5);
		return this;
	};

UTCDate.prototype.getModifiedJulianDate = function(){
/***********************************************************************
 Name: UTCDate.getModifiedJulianDate
 Type: Function
 Purpose: convert UTCDate object to Julian Date
 Return value:
   the Modified Julian Date corresponding to the Date (float)
***********************************************************************/
		return 40587+this.getTime()/864e5;
	};

UTCDate.prototype.setModifiedJulianDate = function(j){
/***********************************************************************
 Name: UTCDate.setModifiedJulianDate
 Type: Function
 Purpose: Convert Modified Julian Date to UTCDate object
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime((j-40587)*864e5);
		return this;
	};

UTCDate.prototype.getJulianCentury = function(){
/***********************************************************************
 Name: UTCDate.getJulianCentury
 Type: Function
 Purpose: Convert UTCDate object to Century
 Return value:
   The century since J2000.0 corresponding to the Date (float)
***********************************************************************/
		return (this.getTime()/864e5-10957.5)/36525;
	};

UTCDate.prototype.setJulianCentury = function(c){
/***********************************************************************
 Name: UTCDate.setJulianCentury
 Type: Function
 Purpose: Convert Julian Century to UTCDate object
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime((c * 36525 + 10957.5)*864e5);
		return this;
	};

UTCDate.prototype.getJulianEpoch = function(){
/***********************************************************************
 Name: UTCDate.getJulianEpoch
 Type: Function
 Purpose: Convert UTCDate object to Julian Epoch.
 Return value:
   the Julian Epoch corresponding to the Date (float)
***********************************************************************/
		return (2000.0 + (this.getTime()/864e5 - 10957.5) / 365.25);
	};

UTCDate.prototype.setJulianEpoch = function(e){
/***********************************************************************
 Name: UTCDate.setJulianEpoch
 Type: Function
 Purpose: Convert Julian Epoch to UTCDate object
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(((e - 2000.0) * 365.25 + 10957.5) * 864e5);
		return this;
	};

UTCDate.prototype.getBesselianEpoch = function(){
/***********************************************************************
 Name: UTCDate.getBesselianEpoch
 Type: Function
 Purpose: Convert UTCDate object to Besselian Epoch
 Return value:
   the Besselian Epoch corresponding to the Date (float)
***********************************************************************/
		return (1900.0 + (this.getTime()/864e5 + 25567.18648 ) / 365.242198781);
	};

UTCDate.prototype.setBesselianEpoch = function(e){
/***********************************************************************
 Name: UTCDate.setBesselianEpoch
 Type: Function
 Purpose: Convert Besselian Epoch to UTCDate object
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(((e - 1900.0) * 365.242198781 - 25567.18648) * 864e5);
		return this;
	};

UTCDate.prototype.getEpoch = function(){
/***********************************************************************
 Name: UTCDate.getEpoch
 Type: Function
 Purpose: Convert UTCDate object to Besselian Epoch if before 1984, Julian Epoch otherise
 Return value:
   the Epoch corresponding to the Date (float)
***********************************************************************/
		if (this.getUTCFullYear()<1984) {
			return this.getBesselianEpoch();
		}
		else {
			return this.getJulianEpoch();
		}
	};

UTCDate.prototype.setEpoch = function(e){
/***********************************************************************
 Name: UTCDate.setEpoch
 Type: Function
 Purpose: Convert UTCDate object to Besselian Epoch if before 1984, Julian Epoch otherise
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
	};

UTCDate.prototype.TTtoTAI = function(){
/***********************************************************************
 Name: UTCDate.TTtoTAI
 Type: Function
 Purpose: Convert Terrestrial Time, TT, to International Atomic Time, TAI.
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(this.getTime()+32.184e3);
		return this;
	};

UTCDate.prototype.TAItoTT = function(){
/***********************************************************************
 Name: UTCDate.TAItoTT
 Type: Function
 Purpose: Convert International Atomic Time, TAI, to Terrestrial Time, TT.
 Return value:
   the Date (UTCDate)
***********************************************************************/
		this.setTime(this.getTime()-32.184e3);
		return this;
	};

UTCDate.prototype.getDeltaAT = function(){
/***********************************************************************
 Name: UTCDate.getDeltaAT
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
	var iy = this.getUTCFullYear();
	var im = this.getUTCMonth();
	var id = this.getUTCDate();
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
		if (i < 0) j = -5;
		else {
			/* Get the Delta(AT). */
			da = changes[i][2];
			/* If pre-1972, adjust for drift. */
			if (i < drift.length) da += (this.getModifiedJulianDate() - drift[i][0]) * drift[i][1];
		}
	}
	/* Return [status,Delta(AT) value]. */
	return [j, da];
};

UTCDate.prototype.UTCtoTAI = function(){
/***********************************************************************
 Name: UTCDate.UTCtoTAI
 Type: Function
 Purpose: Convert UTCDate object from UTC to International Atomic Time, TAI.
 Return value:
   status
***********************************************************************/
		var da = this.getDeltaAT();
		if (da[0]>=0) this.setTime(this.getTime()+da[1]*1e3);
		return da[0];
	};

UTCDate.prototype.TAItoUTC = function(){
/***********************************************************************
 Name: UTCDate.TAItoUTC
 Type: Function
 Purpose:Convert UTCDate object from International Atomic Time, TAI, to UTC.
 Return value:
   status
***********************************************************************/
		var da = this.getDeltaAT();
		if (da[0]>=0) this.setTime(this.getTime()-da[1]*1e3);
		return da[0];
	};
