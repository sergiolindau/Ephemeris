/***********************************************************************
 JavaScript DateTime Object
 Date object extensions for calendar and astronomy calculations
 
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
 JavaScript DateTime Object
 Date object extensions for astronomy calculations
 Copyright (c) 2018 Sergio Lindau
 
 This lybrary provides the DateTime Object, an extension of object Date
 described in ECMAScript 2015 (6th Edition, ECMA-262) available in:
 https://www.ecma-international.org/ecma-262/6.0/#sec-date-objects
 It provides useful aditional time methods for calendar and astronomy
 calculations for Date javascript object.
/***********************************************************************/
//https://www.iana.org/time-zones
//http://tzdata-javascript.org/
//http://www.nuestrocalendario.info/
//https://web.archive.org/web/20150324175305/
//http://www.staff.science.uu.nl/~gent0113/calendar/isocalendar_text4.htm
//http://stjarnhimlen.se/comp/time.html
//https://momentjs.com/timezone/docs/
function DateTime(year, month, date, hours, minutes, seconds, ms, localOrUTC) {
/***********************************************************************
 Name: DateTime
 Type: Constructor
 Purpose:
 Return value:
   the DateTime corresponding to the arguments.
***********************************************************************/
	var larg, islocal = false;
	if (arguments.length>7) {
		larg = arguments[7].toString().trim().toLowerCase();
		islocal = (larg=="loc")||(larg=="local");
	}
	
	var extDate;
	switch (arguments.length) {
    case 0:
		extDate = new Date();
		break;
    case 1:
		if (Math.abs(year)<=4800) {
			if (islocal) extDate = new Date(year, 0, 1, 12, 0, 0, 0)
			else extDate = new Date(Date.UTC(year, 0, 1, 12, 0, 0, 0));
		}
		else {
			extDate = new Date(year);
		}
		break;
    case 2:
		if (islocal) extDate = new Date(year, month, 1, 12, 0, 0, 0)
		else extDate = new Date(Date.UTC(year, month, 1, 12, 0, 0, 0));
		break;
    case 3:
		if (islocal) extDate = new Date(year, month, date, 12, 0, 0, 0)
		else extDate = new Date(Date.UTC(year, month, date, 12, 0, 0, 0));
		break;
    case 4:
		if (islocal) extDate = new Date(year, month, date, hours, 0, 0, 0)
		else extDate = new Date(Date.UTC(year, month, date, hours, 0, 0, 0));
		break;
    case 5:
		if (islocal) extDate = new Date(year, month, date, hours, minutes, 0, 0)
		else extDate = new Date(Date.UTC(year, month, date, hours, minutes, 0, 0));
		break;
    case 6:
		if (islocal) extDate = new Date(year, month, date, hours, minutes, seconds, 0)
		else extDate = new Date(Date.UTC(year, month, date, hours, minutes, seconds, 0));
		break;
    case 7:
		if (islocal) extDate = new Date(year, month, date, hours, minutes, seconds, ms)
		else extDate = new Date(Date.UTC(year, month, date, hours, minutes, seconds, ms));
		break;
    default:
		if (islocal) extDate = new Date(year, month, date, hours, minutes, seconds, ms)
		else extDate = new Date(Date.UTC(year,month,date,hours,minutes,seconds,ms));
	}
	if ((arguments.length>0)&&(year>=0)&&(year<=99)) {
		extDate.setTime(extDate.getTime()-59958144e6)
	}
	extDate.__proto__ = DateTime.prototype;
//	console.log(extDate.__proto__);
//	console.log("------------------------------");
const __DateTimeOldMethods = [
'getDate','getDay','getFullYear','getHours','getMilliseconds',
'getMinutes','getMonth','getSeconds','getTimezoneOffset','getYear',
'setDate','setFullYear','setHours','setMilliseconds','setMinutes',
'setMonth','setSeconds','setYear'
];
	extDate['oldMethods'] = {};
	for(var i=0;i<__DateTimeOldMethods.length;i++) {
		extDate['oldMethods'][__DateTimeOldMethods[i]] = extDate[__DateTimeOldMethods[i]];
	}


	return extDate;
}

DateTime.prototype.__proto__ = Date.prototype;



DateTime.prototype.setNow = function(){
/***********************************************************************
 Name: DateTime.setNow
 Type: Function
 Purpose: Set DateTime to now.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(Date.now());
		return this;
	};

DateTime.prototype.copy = function(){
/***********************************************************************
 Name: DateTime.copy
 Type: Function
 Purpose: Create a copy of DateTime date object.
 Return value:
   the copy of DateTime (DateTime)
***********************************************************************/
		var d = new DateTime();
		d.setTime(this.getTime());
		return d;
	};

DateTime.prototype.setUTC = function(year,month,date,hours,minutes,seconds,ms){
/***********************************************************************
 Name: DateTime.setUTC
 Type: Function
 Purpose: Set DateTime object, with UTC arguments, like constructor.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(Date.UTC(year,month,date,hours,minutes,seconds,ms));
		return this;
	};

DateTime.prototype.setLocal = function(year,month,date,hours,minutes,seconds,ms){
/***********************************************************************
 Name: DateTime.setLocal
 Type: Function
 Purpose: Set DateTime, with arguments in local offset, like constructor.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(Date.UTC(year,month,date,hours,minutes,seconds,ms)+this.getTimezoneOffset()*6e4);
		return this;
	};

/***********************************************************************
 Name: DateTime.getStdTimezoneOffset
 Type: Function
 Purpose: return the standard timezone difference between UTC and Local Time
 Return value:
   A Number, representing the standard time difference between UTC and
   Local Time, in minutes
***********************************************************************/
DateTime.prototype.getStdTimezoneOffset = function() 
{
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

/***********************************************************************
 Name: DateTime.isDaylightSavingTime
 Type: Function
 Purpose: test if daylight saving time
 Return value:
   true if daylight saving time, false otherwise
***********************************************************************/
DateTime.prototype.isDaylightSavingTime = function() {
  return this.getTimezoneOffset() != this.getStdTimezoneOffset();
}

DateTime.prototype.getLocalDay = function(){
/***********************************************************************
 Name: DateTime.getLocalDay
 Type: Function
 Purpose: return local day of week
 Return value:
   the 0-6 local day of week corresponding to sunday, monday, ...
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

DateTime.prototype.formatToString = function(format, larg){
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
		if (islocal) return this.toLocaleDateString()
		else return this.toDateString();
	}
	else if (format=="doy") {
		var data;
		if (islocal)
			data = this.toString().split(" ");
		else
			data = this.toUTCString().split(" ");
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
		if (islocal) return this.toLocaleTimeString()
		else {
			var isNegative = this.getFullYear()<0;
			return this.toISOString().substr(isNegative?14:11, 8);
		}
	}
	else if ((format=="clock")||(format=="clock24")) {
		if (islocal) return this.toLocaleTimeString().substr(0, 5);
		else {
			var isNegative = this.getFullYear()<0;
			return this.toISOString().substr(isNegative?14:11, 5);
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
	else if (format=="gmt") return this.toGMTString();
	else if (format=="iso") return this.toISOString();
	else if (format=="json") return this.toJSONString();
	else if (format=="utc") return this.toGMTString();
	else if ((format=="str")||(format=="string")) {
		if (islocal) return this.toLocaleString()
		else return this.toString();
	}
	else if ((format=="val")||(format=="value")) return this.valueOf();
	return this.toLocaleString()
}

/***********************************************************************
  DateTime prototype constants for calendar and astronomy calculations
***********************************************************************/
/* Milliseconds per day. */
DateTime.prototype.DAYMILLISEC = 24*60*60*1e3;
/* Days per non-leap year. */
DateTime.prototype.DJYY = 365;
/* Days per Julian year. */
DateTime.prototype.DJY = DateTime.prototype.DJYY+1/4;
/* Days per gregorian year (the mean year across the complete leap cycle
   of 400 years is 365.2425 days because 97 out of 400 years are leap
   years). */
DateTime.prototype.DGY = DateTime.prototype.DJYY+97/400;
/* Average number of days in a month (march to december). */
DateTime.prototype.DJMN = (DateTime.prototype.DJYY - (31 + 28) ) / 10;
/* Days per Julian century. */
DateTime.prototype.DJC = DateTime.prototype.DJY*100;
/* Days per Julian millennium. */
DateTime.prototype.DJM = DateTime.prototype.DJY*1E3;
/* Length of tropical year B1900 (days). */
DateTime.prototype.DTY = 365.242198781;
/* Reference epoch (J2000.0), Julian Date. */
DateTime.prototype.DJ00 = 2451545.0;
/* Julian Date of Modified Julian Date zero */
DateTime.prototype.DJM0 = 2400000.5;
/* Reference epoch (J2000.0), Modified Julian Date */
DateTime.prototype.DJM00 = DateTime.prototype.DJ00-DateTime.prototype.DJM0;
/* Reference epoch (J1970.0), Julian Date (midnight 1 Jan 1970 - Unix Time
   reference). */
DateTime.prototype.DJ70 = 2440587.5;
/* Reference epoch (J1970.0), Modified Julian Date (midnight 1 Jan 1970 -
   Unix Time reference). */
DateTime.prototype.DJM70 = DateTime.prototype.DJ70-DateTime.prototype.DJM0;
/* Diference in days between J1970.0 and J2000.0 at noon. */
DateTime.prototype.D7020 = DateTime.prototype.DJ00-DateTime.prototype.DJ70;
/* Julian day in 29 Feb 1 BCE (day 0 for calendar). */
DateTime.prototype.DJCE0 = 1721118;
/* ???? */
DateTime.prototype.DJLM0000 = ( 14 + 31*( 10 + 12*1582 ));
/* Julian day in 14 Oct 1582 (noon of last day of julian calendar). */
DateTime.prototype.DJL = 2299160;
/* L_G = 1 - d(TT)/d(TCG) */
DateTime.prototype.ELG = 6.969290134e-10;
/* TT minus TAI (ms). */
DateTime.prototype.TTMTAIMS = 32.184e3;
/* Conversion factor from seconds of time to radians. */
DateTime.prototype.S2R = Math.PI/(12*60*60);
/* Number of days in [i][0] each month, [i][1] cumulative at start of each
   month (non-leap year), [i][2] cumulative at start of each month (leap year)  */
DateTime.prototype.monthTable = [
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
DateTime.prototype.paschalFullMoon = [
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

DateTime.prototype.isLeap = function(year){
/***********************************************************************
 Name: DateTime.isLeap
 Type: Function
 Purpose: test if the year is a leap year
 Return value:
   true if is leap year, false otherwise
***********************************************************************/
		return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
	};

DateTime.prototype.monthOfDayOfYear = function(day,leap){
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
	};
	
DateTime.prototype.isUTCLeapYear = function(){
/***********************************************************************
 Name: DateTime.isUTCLeapYear
 Type: Function
 Purpose: test if the UTC year is a leap year
 Return value:
   true if is UTC leap year, false otherwise
***********************************************************************/
		return this.isLeap(this.getUTCFullYear());
	};

DateTime.prototype.isLocalLeapYear = function(){
/***********************************************************************
 Name: DateTime.isLocalLeapYear
 Type: Function
 Purpose: test if the Local year is a leap year
 Return value:
   true if is Local leap year, false otherwise
***********************************************************************/
		return this.isLeap(this.getFullYear());
	};
	
DateTime.prototype.getUTCMonthDays = function(){
/***********************************************************************
 Name: DateTime.isLocalLeapYear
 Type: Function
 Purpose: return UTC
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

DateTime.prototype.getLocalMonthDays = function(){
/***********************************************************************
 Name: DateTime.isLocalLeapYear
 Type: Function
 Purpose: 
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

DateTime.prototype.getUTCDayOfYear = function(){
/***********************************************************************
 Name: DateTime.getUTCDayOfYear
 Type: Function
 Purpose: 
 Return value:
   the number of days since start of year (integer)
***********************************************************************/
		return monthTable[this.getUTCMonth()][this.isUTCLeapYear()?2:1]+this.getUTCDate();
	};

DateTime.prototype.getLocalDayOfYear = function(){
/***********************************************************************
 Name: DateTime.getLocalDayOfYear
 Type: Function
 Purpose: 
 Return value:
   the number of days since start of year (integer)
***********************************************************************/
		return monthTable[this.getMonth()][this.isLocalLeapYear()?2:1]+this.getDate();
	};

DateTime.prototype.getJulianDay = function(){
/***********************************************************************
 Name: DateTime.getJulianDay
 Type: Function
 Purpose: convert DateTime object to Julian Day at noon
 Return value:
   the Julian Day corresponding to the Date (integer)
***********************************************************************/
		return Math.trunc(this.DJ70+0.5+this.getTime()/this.DAYMILLISEC);
	};

DateTime.prototype.setJulianDay = function(j){
/***********************************************************************
 Name: DateTime.setJulianDay
 Type: Function
 Purpose: Convert Julian Day to DateTime object at midnight
 Return value:
   the Date (DateTime)
***********************************************************************/
		var d = this.getTime()/this.DAYMILLISEC;
		this.setTime((Math.trunc(j-this.DJ70-1) + (d - Math.trunc(d)))*this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getUT = function(){
/***********************************************************************
 Name: DateTime.getUT
 Type: Function
 Purpose: convert DateTime object to UT
 Return value:
   the UT corresponding to the Date (float)
***********************************************************************/
		var d = this.getTime()/this.DAYMILLISEC;
		return (d - Math.trunc(d))*24.0;
	};

DateTime.prototype.setUT = function(t){
/***********************************************************************
 Name: DateTime.setUT
 Type: Function
 Purpose: Set UT to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime((Math.trunc(this.getTime()/this.DAYMILLISEC)+t/24.0)*this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getLT = function(){
/***********************************************************************
 Name: DateTime.getLT
 Type: Function
 Purpose: convert DateTime object to LT (Local Time)
 Return value:
   the LT corresponding to the Date (float)
***********************************************************************/
		var d = this.getTime()/this.DAYMILLISEC;
		return (d - Math.trunc(d))*24.0-this.getStdTimezoneOffset()/60;
	};

DateTime.prototype.setLT = function(t){
/***********************************************************************
 Name: DateTime.setLT
 Type: Function
 Purpose: Set LT (Local Time) to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime((Math.trunc(this.getTime()/this.DAYMILLISEC)+t/24.0+this.getStdTimezoneOffset()/60)*this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.incGregorianYears = function(t){
/***********************************************************************
 Name: DateTime.incGregorianYears
 Type: Function
 Purpose: Increase gregorian years (365.2425 days) to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setTime(this.getTime()+t*this.DAYMILLISEC*this.DGY);
	return this;
}

DateTime.prototype.incJulianYears = function(t){
/***********************************************************************
 Name: DateTime.incJulianYears
 Type: Function
 Purpose: Increase julian years (365.25 days) to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setTime(this.getTime()+t*this.DAYMILLISEC*this.DJY);
	return this;
}

DateTime.prototype.incTropicalYears = function(t){
/***********************************************************************
 Name: DateTime.incJulianYears
 Type: Function
 Purpose: Increase tropical years to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setTime(this.getTime()+t*this.DAYMILLISEC*this.DTY);
	return this;
}

DateTime.prototype.incYear = function(t){
/***********************************************************************
 Name: DateTime.incYears
 Type: Function
 Purpose: Increase years to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCFullYear(this.getUTCFullYear()+t);
	return this;
}

DateTime.prototype.incMonth = function(t){
/***********************************************************************
 Name: DateTime.incYears
 Type: Function
 Purpose: Increase years to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCMonth(this.getUTCMonth()+t);
	return this;
}

DateTime.prototype.incDate = function(t){
/***********************************************************************
 Name: DateTime.incDate
 Type: Function
 Purpose: Increase days to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCDate(this.getUTCDate()+t);
	return this;
}

DateTime.prototype.incHours = function(t){
/***********************************************************************
 Name: DateTime.incHours
 Type: Function
 Purpose: Increase hours to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCHours(this.getUTCHours()+t);
	return this;
}

DateTime.prototype.incMinutes = function(t){
/***********************************************************************
 Name: DateTime.incMinutes
 Type: Function
 Purpose: Increase minutes to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCMinutes(this.getUTCMinutes()+t);
	return this;
}

DateTime.prototype.incSeconds = function(t){
/***********************************************************************
 Name: DateTime.incSeconds
 Type: Function
 Purpose: Increase seconds to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCSeconds(this.getUTCSeconds()+t);
	return this;
}

DateTime.prototype.incMilliseconds = function(t){
/***********************************************************************
 Name: DateTime.incMilliseconds
 Type: Function
 Purpose: Increase milliseconds to DateTime object
 Return value:
   the new value of date and time (DateTime)
***********************************************************************/
	this.setUTCMilliseconds(this.getUTCMilliseconds()+t);
	return this;
}

DateTime.prototype.getJulianDate = function(){
/***********************************************************************
 Name: DateTime.getJulianDate
 Type: Function
 Purpose: convert DateTime object to Julian Date
 Return value:
   the Julian Date corresponding to the Date (float)
***********************************************************************/
		return this.DJ70+this.getTime()/this.DAYMILLISEC;
	};

DateTime.prototype.setJulianDate = function(j){
/***********************************************************************
 Name: DateTime.setJulianDate
 Type: Function
 Purpose: Convert Julian Date to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime((j-this.DJ70)*this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getModifiedJulianDate = function(){
/***********************************************************************
 Name: DateTime.getModifiedJulianDate
 Type: Function
 Purpose: convert DateTime object to Julian Date
 Return value:
   the Modified Julian Date corresponding to the Date (float)
***********************************************************************/
		return this.DJM70+this.getTime()/this.DAYMILLISEC;
	};

DateTime.prototype.setModifiedJulianDate = function(j){
/***********************************************************************
 Name: DateTime.setModifiedJulianDate
 Type: Function
 Purpose: Convert Modified Julian Date to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime((j-this.DJM70)*this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getJulianCentury = function(){
/***********************************************************************
 Name: DateTime.getJulianCentury
 Type: Function
 Purpose: Convert DateTime object to Century
 Return value:
   The century since J2000.0 corresponding to the Date (float)
***********************************************************************/
		return (this.getTime()/this.DAYMILLISEC - this.D7020)/this.DJC;
	};

DateTime.prototype.setJulianCentury = function(c){
/***********************************************************************
 Name: DateTime.setJulianCentury
 Type: Function
 Purpose: Convert Julian Century to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime((c * this.DJC + this.D7020)*this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getJulianEpoch = function(){
/***********************************************************************
 Name: DateTime.getJulianEpoch
 Type: Function
 Purpose: Convert DateTime object to Julian Epoch.
 Return value:
   the Julian Epoch corresponding to the Date (float)
***********************************************************************/
		return (2000.0 + (this.getTime()/this.DAYMILLISEC - this.D7020) / this.DJY);
	};

DateTime.prototype.setJulianEpoch = function(e){
/***********************************************************************
 Name: DateTime.setJulianEpoch
 Type: Function
 Purpose: Convert Julian Epoch to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(((e - 2000.0) * this.DJY + this.D7020) * this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getBesselianEpoch = function(){
/***********************************************************************
 Name: DateTime.getBesselianEpoch
 Type: Function
 Purpose: Convert DateTime object to Besselian Epoch
 Return value:
   the Besselian Epoch corresponding to the Date (float)
***********************************************************************/
		return (1900.0 + (this.getTime()/this.DAYMILLISEC + 25567.18648 ) / this.DTY);
	};

DateTime.prototype.setBesselianEpoch = function(e){
/***********************************************************************
 Name: DateTime.setBesselianEpoch
 Type: Function
 Purpose: Convert Besselian Epoch to DateTime object
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(((e - 1900.0) * this.DTY - 25567.18648) * this.DAYMILLISEC);
		return this;
	};

DateTime.prototype.getEpoch = function(){
/***********************************************************************
 Name: DateTime.getEpoch
 Type: Function
 Purpose: Convert DateTime object to Besselian Epoch if before 1984, Julian Epoch otherise
 Return value:
   the Epoch corresponding to the Date (float)
***********************************************************************/
		if (this.getUTCFullYear()<1984.0) {
			return this.getBesselianEpoch();
		}
		else {
			return this.getJulianEpoch();
		}
	};

DateTime.prototype.setEpoch = function(e){
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
	};

DateTime.prototype.TTtoTAI = function(){
/***********************************************************************
 Name: DateTime.TTtoTAI
 Type: Function
 Purpose: Convert Terrestrial Time, TT, to International Atomic Time, TAI.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(this.getTime()-this.TTMTAIMS);
		return this;
	};

DateTime.prototype.TAItoTT = function(){
/***********************************************************************
 Name: DateTime.TAItoTT
 Type: Function
 Purpose: Convert International Atomic Time, TAI, to Terrestrial Time, TT.
 Return value:
   the Date (DateTime)
***********************************************************************/
		this.setTime(this.getTime()+this.TTMTAIMS);
		return this;
	};

DateTime.prototype.getDeltaAT = function(){
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
	var iy = this.getUTCFullYear();
	var im = this.getUTCMonth()+1;
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
};

DateTime.prototype.UTCtoTAI = function(){
/***********************************************************************
 Name: DateTime.UTCtoTAI
 Type: Function
 Purpose: Convert DateTime object from UTC to International Atomic Time, TAI.
 Return value:
   status
***********************************************************************/
		var da = this.getDeltaAT();
		if (da[0]>=0) this.setTime(this.getTime()+da[1]*1e3);
		return this;
	};

DateTime.prototype.TAItoUTC = function(){
/***********************************************************************
 Name: DateTime.TAItoUTC
 Type: Function
 Purpose:Convert DateTime object from International Atomic Time, TAI, to UTC.
 Return value:
   status
***********************************************************************/
		var da = this.getDeltaAT();
		if (da[0]>=0) this.setTime(this.getTime()-da[1]*1e3);
		return this;
	};

DateTime.prototype.TTtoTCG = function(){
/***********************************************************************
 Name: DateTime.TTtoTCG
 Type: Function
 Purpose: Convert DateTime object from Terrestrial Time, TT, to Geocentric
  Coordinate Time, TCG.
 Return value:
   status
***********************************************************************/
		/* TT to TCG rate */
		var elgg = this.ELG/(1.0-this.ELG);
		var tt = this.getModifiedJulianDate();
		this.setModifiedJulianDate(tt + ( tt - 43144.0003725 ) * elgg);
		return this;
	};

DateTime.prototype.TCGtoTT = function(){
/***********************************************************************
 Name: DateTime.TCGtoTT
 Type: Function
 Purpose: Convert DateTime object Geocentric Coordinate Time, TCG, to
   Terrestrial Time, TT.
 Return value:
   status
***********************************************************************/
		var tcg = this.getModifiedJulianDate();
		this.setModifiedJulianDate(tcg - ( tcg - 43144.0003725 ) * this.ELG);
		return this;
	};