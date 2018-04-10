/*
 Calendar utilities for Javascript

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
 THE SOFTWARE.*/

/***********************************************************************
 Constant Calendar definition
 
 Include before this file mathext.js using:
 
 <script language="javascript" src="mathext.js"></script>

************************************************************************/
	/* Seconds per minute. */
const Calendar_MINSEC = 60 
	/* Minutes per hour. */
const Calendar_HOURMIN = 60;
	/* Seconds per hour. */
const Calendar_HOURSEC = Calendar_HOURMIN * Calendar_MINSEC;
	/* Hours per day. */
const Calendar_DAYHOUR = 24;
	/* Minutes per day. */
const Calendar_DAYMIN = Calendar_DAYHOUR * Calendar_HOURMIN;
	/* Seconds per day. */
const Calendar_DAYSEC = Calendar_DAYHOUR * Calendar_HOURSEC;
	/* Milliseconds per second. */
const Calendar_MILLISEC = 1E3;
	/* Length of tropical year B1900 (days). */
const Calendar_DTY = 365.242198781;
	/* Days per non-leap year. */
const Calendar_DAYY = Math.floor(Calendar_DTY);
	/* Days per Julian year. */
const Calendar_DJY = Calendar_DAYY + 1/4;
	/* Days per gregorian year (the mean year across the complete leap cycle of 400 years is 365.2425 days because 97 out of 400 years are leap years). */
const Calendar_DGY = Calendar_DAYY + 97/400;
	/* Average number of days in a month (march to december). */
const Calendar_DJMN = ( Calendar_DAYY - ( 31 + 28) ) / 10;
	/* Days per Julian century. */
const Calendar_DJC = Calendar_DJY*1E2;
	/* Days per Julian millennium. */
const Calendar_DJM = Calendar_DJY*1E3;
	/* Reference epoch (J2000.0), Julian Date (noon 1 Jan 2000). */
const Calendar_DJ00 = 2451545;
	/* Reference epoch (J1970.0), Julian Date (noon 1 Jan 1970 - Unix Time reference is at midnight). */
const Calendar_DJ70 = 2440588;
	/* Reference epoch (J1977.0); Julian Date (noon 1 Jan 1977). */
const Calendar_DJ77 = 2443145;
	/* Julian Date of Modified Julian Date zero. */
const Calendar_DJM0 = 2400000.5;
	/* Julian day in 14 Oct 1582 (noon of last day of julian calendar). */
const Calendar_DJL = 2299160;
	/* Julian day in 29 Feb 1 BCE (day 0 for calendar). */
const Calendar_DJCE0 = 1721118;
	/* ???? */
const Calendar_DJLM0000 = ( 14 + 31*( 10 + 12*1582 ));
	/* Reference epoch (J2000.0); Modified Julian Date. */
const Calendar_DJM00 = Calendar_DJ00 - Calendar_DJM0;
	/* 1970 Jan 1.0 as MJD. */
const Calendar_DJM70 = Calendar_DJ70 - Calendar_DJM0;
	/* 1977 Jan 1.0 as MJD. */
const Calendar_DJM77 = Calendar_DJ77 - Calendar_DJM0;
	/* TT minus TAI (s). */
const Calendar_TTMTAI = 32.184;
	/* Conversion factor from seconds of time to radians. */
const Calendar_S2R = Math.PI/(12*60*60);



/***********************************************************************/
const Calendar = {
	MINSEC : Calendar_MINSEC,
	HOURMIN : Calendar_HOURMIN,
	HOURSEC : Calendar_HOURSEC,
	DAYHOUR : Calendar_DAYHOUR,
	DAYMIN : Calendar_DAYMIN,
	DAYSEC : Calendar_DAYSEC,
	MILLISEC : Calendar_MILLISEC,
	DTY : Calendar_DTY,
	DAYY : Calendar_DAYY,
	DJY : Calendar_DJY,
	DGY	 : Calendar_DGY,
	DJMN : Calendar_DJMN,
	DJC : Calendar_DJC,
	DJM : Calendar_DJM,
	DJ00 : Calendar_DJ00,
	DJ70 : Calendar_DJ70,
	DJ77 : Calendar_DJ77,
	DJM0 : Calendar_DJM0,
	DJL : Calendar_DJL,
	DJCE0 : Calendar_DJCE0,
	DJLM0000 : Calendar_DJLM0000,
	DJM00 : Calendar_DJM00,
	DJM70 : Calendar_DJM70,
	DJM77 : Calendar_DJM77,
	TTMTAI : Calendar_TTMTAI,
	S2R : Calendar_S2R,
	/* Number of days in [i][0] each month, [i][1] cumulative at start of each month (non-leap year), [i][2] cumulative at start of each month (leap year)  */
	MMTAB : [
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
	],

	jd2cy : function(j) {
/***********************************************************************
 Name: Calendar.jd2cy
 Type: Function
 Purpose: convert Julian Day to centuries since J2000.0.
 Arguments:
   j : the Julian Day to convert (float)
 Return value:
   the century since J2000.0 value corresponding to the Julian Day j value (float)
***********************************************************************/
		return (j - Calendar.DJ00)/Calendar.DJC;
	},

	cy2jd : function(c) {
/***********************************************************************
 Name:    Calendar.cy2jd
 Type:    Function
 Purpose: convert centuries since J2000.0 to Julian Day.
 Arguments:
   c : number of Julian centuries since J2000.0 (float)
 Return value:
   the Julian Day value corresponding to the Julian centuries since J2000.0 c value (float)
***********************************************************************/
		return c * Calendar.DJC + Calendar.DJ00;
	},

	jd2date : function(j) {
/***********************************************************************
 Name: Calendar.jd2date
 Type: Function
 Purpose: convert Julian Day to Date object
 Arguments:
   j : the Julian Day to convert (float)
 Return value:
   the value corresponding to the Julian Day (Date)
***********************************************************************/
		var date = new Date();
		date.setTime((j-this.DJ70+0.5)*(this.DAYSEC*this.MILLISEC));
		return date;
	},

	date2jd : function(d){
/***********************************************************************
 Name: Calendar.date2jd
 Type: Function
 Purpose: convert Date object to Julian Day
 Arguments:
   d : the Date to convert (Date)
 Return value:
   the Julian Day corresponding to the Date (float)
***********************************************************************/
		return this.DJ70-0.5+d.getTime()/(this.DAYSEC*this.MILLISEC);
	},

	cy2date : function(c) {
/***********************************************************************
 Name: Calendar.cy2date
 Type: Function
 Purpose: convert centuries since J2000.0 to Date object
 Arguments:
   c : number of Julian centuries since J2000.0 (float)
 Return value:
   the value corresponding to the Julian century since J2000.0 (Date)
***********************************************************************/
		return Calendar.jd2date(Calendar.cy2jd(c));
	},

	date2cy : function(d){
/***********************************************************************
 Name: Calendar.date2cy
 Type: Function
 Purpose: convert Date object to centuries since J2000.0
 Arguments:
   d : the Date to convert (Date)
 Return value:
   the centuries since J2000.0 corresponding to the Date (float)
***********************************************************************/
		return Calendar.jd2cy(Calendar.date2jd(d));
	},

	tf2d : function(ihour,imin,sec) {
/***********************************************************************
 Name: Calendar.tf2d
 Type: Function
 Purpose: Compute the interval rounded to milliseconds
 Arguments:
   ihour : hour (integer)
   imin : minute (integer)
   sec : second (float)
 Return value:
   the interval corresponding to the ihour:imin:sec (float)
***********************************************************************/
		return Math.round10(Math.sign(ihour)*
		(this.MINSEC*(this.HOURMIN*	Math.abs(ihour) +
									Math.abs(imin)) +
									Math.abs(sec)) / this.DAYSEC,-9);
	},

	isleap : function(iy){
/***********************************************************************
 Name: Calendar.isleap
 Type: Function
 Purpose: test if the year is a leap year
 Arguments:
   iy : year (integer)
 Return value:
   1 if is leap year, 0 if not
***********************************************************************/
		return ((iy % 4 == 0) && (iy % 100 != 0 || iy % 400 == 0))?1:0;
	},

	leap : function(iy){
/***********************************************************************
 Name: Calendar.leap
 Type: Function
 Purpose: returns number of cumulative leap days in year
 Arguments:
   iy : year (integer)
 Return value:
   cumulative leap days
***********************************************************************/
		return (Math.floor(iy / 4) - Math.floor(iy / 100) + Math.floor(iy / 400));
	},

	jdnsh : function(j) {
/***********************************************************************
 Name:    Calendar.jdnsh
 Type:    Function
 Purpose: Julian day as float to julian day as integer and UT fraction as float. Do the noon shift.
 Arguments:
   j : Julian day (float)
 Return value:
   The Julian day (integer) and UT fraction (float) as array.
   Do the noon shift.
***********************************************************************/
		var jd=Math.trunc(j+0.5);
		return [jd, Math.round10(Math.frac(j)+((jd==Math.round(j))?-0.5:0.5),-9)];
	},
	cal2jd0_std : function(iy, im){
/***********************************************************************
 Name:    Calendar.cal2jd0_std
 Type:    Function
 Purpose: Julian day at year and start of month. Uses internal Date object to conversion).
          Standards for test.
 Arguments:
   iy : Year. (integer)
   im : Month. (integer)
 Return value:
   The Julian day (integer) from year iy and start at month im.
***********************************************************************/
		var date = new Date();
		date.setUTCFullYear(iy,im,0);
		date.setUTCHours(12,0,0,0);
		return Calendar.date2jd(date);
	},
/***********************************************************************/
	cal2jd0 : function ( iy, im ) {
		var my = Math.floor((13 - im)/12), iypmy = iy + 4800 - my;
		return Math.floor((153*(im + 12*my - 2)+2)/5) + 365*iypmy + Calendar.leap(iypmy) - 32045;
	},
/***********************************************************************/
	cal2jd_std : function(iy,im,id) {
		return Calendar.cal2jd0_std(iy,im)+id;
	},
/***********************************************************************/
	cal2jd0_test : function ( iy, im ) {
		return (-32075+1461*(iy+4800+(im-14)/12)/4+367*(im-2-(im-14)/12*12)/12-3*((iy+4900+(im-14)/12)/100)/4);
	},

	cal2jd : function(iy,im,id) {
/***********************************************************************
 Name:    Calendar.cal2jd
 Type:    Function
 Purpose: Julian day from calendar day
 Arguments:
   iy : year
   im : month, January = 0
   id : day, 1 - 31
 Return value:
   The Julian day corresponding to the date
***********************************************************************/
		return Calendar.cal2jd0(iy,im)+id;
	},
/***********************************************************************/
	jd2cal_std : function(j) {
		var jdnf = Calendar.jdnsh(j);
		var date = Calendar.jd2date(jdnf[0]);
		return [date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),jdnf[1]];
	},
/***********************************************************************/
	jd2cal : function(j) {
		/* Separate day and fraction. */
		var jdnf = Calendar.jdnsh(j);
		var e,g,h,m;
		var f =  jdnf[0] + 1401 + Math.floor(Math.floor((4 * jdnf[0] + 274277) / 146097) * 3 / 4) -38;
		e = 4 * f + 3;
		g = Math.floor((e % 1461)/4);
		h = 5 * g + 2;
		m =  ((Math.floor(h / 153) + 2 ) % 12) + 1
		return [Math.floor(e/1461)-4716+Math.floor((14-m)/12), m-1, Math.floor((h % 153) / 5) + 1, jdnf[1]];
	},
/***********************************************************************/
	jd2dw0 : function(j){
/***********************************************************************
 Name:    jd2dw0
 Type:    Function
 Purpose: Derives weekday from Julian Day, Returns 0 to sunday.
 Arguments:
   juld : Julian Day
 Return value:
   Value containing number of weekday.
***********************************************************************/
		return Math.round(((j + 1.5) % 7)); // 0 - Sunday, 1 - Moonday, ...
	},
	jd2dw1 : function(j){
/***********************************************************************
 Name:    jd2dw1
 Type:    Function
 Purpose: Derives weekday from Julian Day, Returns 7 to sunday.
 Arguments:
   juld : Julian Day
 Return value:
   String containing number of weekday
***********************************************************************/
		return Math.round((j+1) % 7); // 1 - Moonday, ..., 7 - Sunday
	},

	cal2doy0 : function (im, id, il) {
/***********************************************************************
 Name:    cal2doy0
 Type:    Function
 Purpose: Finds numerical day-of-year from im, id and il year info, argument 0 - January.
 Arguments:
   im: January = 0
   id  : 1 - 31
   il : 1 if leap year, 0 if not
 Return value:
   The numerical day of year
***********************************************************************/
		im++;
		return Math.floor((275 * im)/9) - (il ? 1 : 2) * Math.floor((im + 9)/12) + id - 30;
	},
	cal2doy1 : function (im, id, il) {
/***********************************************************************
 Name:    cal2doy1
 Type:    Function
 Purpose: Finds numerical day-of-year from im, id and il year info, argument 1 - January.
 Arguments:
   im: January = 1
   id  : 1 - 31
   il : 1 if leap year, 0 if not
 Return value:
   The numerical day of year
***********************************************************************/
		return Math.floor((275 * im)/9) - (il ? 1 : 2) * Math.floor((im + 9)/12) + id - 30;
	},
/***********************************************************************/

/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/************************* Test ****************************************/
/***********************************************************************/
/***********************************************************************/
	cal2jd0a : function(iy, im){
		return ( (((iy<100) && (iy > 0))?1750279:2440587)+Date.UTC(iy, im, 1,0,0,0,0)/8.64e7 );
	},
/***********************************************************************/
	cal2jd0b : function(iy,im) {
		var my = Math.floor((13 - im)/12), iypmy = iy - my;
		return Math.floor( 
			  ((1461*(iypmy + 4800))/4)
			+ ((367*(im + 12*my - 1))/12)
			- ((3*( (iypmy + 4900)/100 ))/4)
			- 32075
		);
	},
/***********************************************************************/
	cal2jd0c : function(iy, im) {
		return (367*iy
			- Math.floor(7 * ( iy + ((im+9)/12) ) / 4)
			+ Math.floor(275*im/9)
			+ 1721059);
	},
/***********************************************************************/
	cal2jd0d : function(iy, im){
//		return Math.trunc(365.2425*iy+30.6*((im > 1)?im+2:im))+((im > 1)?(1721060-63):1721060) - (this.isleap(iy,im)?1:0);
		return Math.floor(365.25*iy+30.6*im+1717410)
	},
/***********************************************************************/
cal2jd0e : function ( y, m)
{
	var jy, ja, jm;			//scratch

	if( m > 1 ) {
		jy = y;
		jm = m + 2;
	} else {
		jy = y - 1;
		jm = m + 14;
	}

	var intgr = Math.floor( Math.floor(365.25*jy) + Math.floor(30.6*jm) + 1720994);
    return intgr;
},
/***********************************************************************/
	cal2jd0f : function ( iy, im )
	{
	    return Math.round((iy*12+im)*30.4375+1721058.5);
	},
/***********************************************************************/
	cal2jd0g : function (year, month)
	{
		month+=1;
		if (month <= 2) {
			year -= 1;
			month += 12;
		}
		var A = Math.floor(year/100);
		var B = 2 - A + Math.floor(A/4);

		var JD = Math.floor(365.25*(year + 4716)) + Math.floor(30.6001*(month+1)) + B - 1524;
		return JD;
	},
/***********************************************************************/
	cal2jd0h : function ( iy, im ) {
		var id = 1;
		var mm = im+1;
		var jy=iy, ja, jm, jul;
		if (jy<0) ++jy;
		if (mm > 2) jm=mm+1;
		else { --jy; jm=mm+13;}
		jul = Math.trunc(Math.floor(365.25*jy)+Math.floor(30.6001*jm)+id+1720995);
		if (id+31*(mm+12*iy) >= this.DJLM0000) {
			ja = Math.trunc(0.01*jy);
			jul += 2-ja+Math.trunc(0.25*ja);
		}
		return jul;
	},
/***********************************************************************/
	jd2cala : function(j) {
		/* Separate day and fraction. */
		var jdnf = Calendar.jdnsh(j);
		var l, n, i, k, id; //(long)
		/* Express day in Gregorian calendar. */
		l = jdnf[0] + 68569;
		n = Math.round((4 * l) / 146097);
		l -= Math.round((146097 * n + 3) / 4);
		i = Math.round((4000 * (l + 1)) / 1461001);
		l -= Math.round((1461 * i) / 4) - 31;
		k = Math.round((80 * l) / 2447);
		id = Math.floor(l - (2447 * k) / 80);
		l = Math.round(k / 11);
		return [(100 * (n - 49) + i + l),(k + 1 - 12 * l),id,jdnf[1]];
	},
/***********************************************************************/
	deltaJ : function(iy, im, id) {
		// Returns Math.floor(this.DJY*iy)+Math.floor(this.DJMN*im)+id
		return Math.floor(this.DJY*iy)+Math.floor(this.DJMN*im)+id;
	},
/***********************************************************************/
EvalJD : function (form) {
  var id = form.DayList.selectedIndex+1;
  var mm = form.MonthList.selectedIndex+1;
  var iyyy = tolong(form.YearBox.value);
  var ysgn = 1-2*form.ADBC.selectedIndex;
  var jy=ysgn*iyyy, ja, jm, jul;
  if (iyyy < 1) {
    alert("Enter positive year, then specify A.D. or B.C.\n(There was no year 0.)")
    return;
  }
  if (jy<0) ++jy;
  if (mm > 2) jm=mm+1;
  else { --jy; jm=mm+13;}
  jul = tolong(Math.floor(365.25*jy)+Math.floor(30.6001*jm)+id+1720995);
  if (id+31*(mm+12*ysgn*iyyy) >= form.IGREG) {
    ja = tolong(0.01*jy);
    jul += 2-ja+tolong(0.25*ja);
  }
  form.JD.value = jul;
  civcheck=caldat(jul,form);
  SetDoW(form,jul);
  SetDelta();
  if (civcheck.mm != mm || civcheck.dd != id || civcheck.yyyy != iyyy
      || civcheck.ab != ysgn) {
      form.JD.value = "no such!";
      form.dayofweek.value = "???";
      document.Delta.delta.value = "???";
  }
},
/***********************************************************************/
	toSource : function() {
		return "Calendar";
	}
};








	function civil(era,year,month,date,jul) {
		switch (arguments.length) {
			case 0:
			default:
				throw "Invalid Arguments.";
		}
		this.era=era;
		this.year=year;
		this.month=month;
		this.date=date;
		this.jul=jul;
		console.log([this.era,this.year,this.month,this.date,this.jul]);
	}

function calcUT(hours, minutes, seconds, milliseconds) {
/***********************************************************************
 Name:    calcUT
 Type:    Function
 Purpose: Universal Time from hour
 Arguments:
 Return value:
   The Universal Time corresponding to hours, minutes, seconds, milliseconds.
 Note:
   Number is returned for start of civil day (0 at midnight).
***********************************************************************/
	return hours + ( 6*minutes + seconds*1.0E-2 + milliseconds*1.0E-5) / 360.0;
}

/***********************************************************************
 Name:    calcJ
 Type:    Function
 Purpose: 
 Arguments:
 Return value:
***********************************************************************/
function calcJ(year, month, day) {
	return Math.floor(365.25*year)+Math.floor(30.6001*month)+day;
}

var IGREG = (14+31*(10+12*1582));
//var IGREG = 1.0E30;
/***********************************************************************
 Name:    calcJD
 Type:    Function
 Purpose: Julian day from calendar day
 Arguments:
   year : 4 digit year
   month: January = 1
   day  : 1 - 31
 Return value:
   The Julian day corresponding to the date
 Note:
   Number is returned for start of civil day (midnight). Fractional part is -0.5 shift from noon.
***********************************************************************/

function calcJD(year, month, day) {
	var ysgn = year/Math.abs(year);
	year = Math.abs(Math.trunc(year));
	var jy=ysgn*year, ja, jm, jul;
	if (year < 1) year = 1;
	if (jy<0) ++jy;
	if (month > 2) jm=month+1;
	else { --jy; jm=month+13;}
	jul = Math.trunc(calcJ(jy,jm,day+1720995));
	if (day+31*(month+12*ysgn*year) >= IGREG) {
		ja = Math.trunc(0.01*jy);
		jul += 2-ja+Math.trunc(0.25*ja);
	}
	return (jul)-0.5;
}
/***********************************************************************
 Name:    calcJDN
 Type:    Function
 Purpose: Julian day from calendar day
 Arguments:
   year : 4 digit year
   month: January = 1
   day  : 1 - 31
 Return value:
   The Julian day corresponding to the date
 Note:
   Number is returned for start of civil day (midnight). Fractional part is -0.5 shift from noon.
***********************************************************************/
function calcJDN() {
	var year = 1, month = 1, day = 1, hours=0, minutes = 0, seconds = 0, milliseconds = 0, calcTime = false;
	var daysadd = 0;
	switch (arguments.length) {
		case 0:
			return  1721423.5;
		case 1:
			if (arguments[0].getUTCDate) {
				year = arguments[0].getUTCFullYear();
				month = arguments[0].getUTCMonth();
				day = arguments[0].getUTCDate();
				hours = arguments[0].getUTCHours();
				minutes = arguments[0].getUTCMinutes();
				seconds = arguments[0].getUTCSeconds();
				milliseconds = arguments[0].getUTCMilliseconds();
				calcTime = (hours!=0)||(minutes!=0)||(seconds!=0)||(milliseconds!=0);
			}
			else {
				year = Math.floor(arguments[0]);
				daysadd += Math.frac(arguments[0])*365.25;
			}
			break;
		case 2:
			year = Math.floor(arguments[0]);
			month = Math.floor(arguments[1]);
			break;
		case 3:
			year = Math.floor(arguments[0]);
			month = Math.floor(arguments[1]);
			day = Math.floor(arguments[2]);
			daysadd += Math.frac(arguments[2]);
			break;
		case 4:
			year = Math.floor(arguments[0]);
			month = Math.floor(arguments[1]);
			day = Math.floor(arguments[2]);
			hours = Math.floor(arguments[3]);
			daysadd += Math.frac(arguments[3]) / 24.0;
			calcTime = true;
			break;
		case 5:
			year = Math.floor(arguments[0]);
			month = Math.floor(arguments[1]);
			day = Math.floor(arguments[2]);
			hours = Math.floor(arguments[3]);
			minutes = Math.floor(arguments[4]);
			daysadd += Math.frac(arguments[4]) / (24.0 * 60);
			calcTime = true;
			break;
		case 6:
			year = Math.floor(arguments[0]);
			month = Math.floor(arguments[1]);
			day = Math.floor(arguments[2]);
			hours = Math.floor(arguments[3]);
			minutes = Math.floor(arguments[4]);
			seconds = Math.floor(arguments[5]);
			daysadd += Math.frac(arguments[5]) / (24.0 * 60 * 60);
			calcTime = true;
			break;
		case 7:
			year = Math.floor(arguments[0]);
			month = Math.floor(arguments[1]);
			day = Math.floor(arguments[2]);
			hours = Math.floor(arguments[3]);
			minutes = Math.floor(arguments[4]);
			seconds = Math.floor(arguments[5]);
			milliseconds = Math.floor(arguments[6]);
			calcTime = true;
			break;
		default:
			throw "Invalid Arguments.";
	}
  return calcJD(year,month,day)+daysadd+(calcTime?calcUT(hours,minutes,seconds,milliseconds)/24.0:0);
}
function calcJDN2(year, month, day, hours, minutes, seconds, milliseconds){
	return 2440587.5+Date.UTC(year, month, day, hours, minutes, seconds, milliseconds)/8.64e7;
//	return Date.UTC(year, month, day, hours, minutes, seconds, milliseconds);
}
function calcJDN3(date){
	return 2440587.5+date.getTime()/8.64e7;
//	return Date.UTC(year, month, day, hours, minutes, seconds, milliseconds);
}
/***********************************************************************/
function getJ2000Date(date){return 367*date.getUTCFullYear() - ~~(7 * ( date.getUTCFullYear() + ~~((date.getUTCMonth()+9)/12) ) / 4) + ~~(275*date.getUTCMonth()/9) + date.getUTCDate() - 730531.5;}
function getUT(date){return date.getUTCHours() + ( 6*date.getUTCMinutes() + date.getUTCSeconds()*1.0E-2 + date.getUTCMilliseconds()*1.0E-5) / 360.0;}
function getJ2000Day(date){return getJ2000Date(date) +  (getUT(date) + 12)/ 24.0;}
function getJulianDay(date){return getJ2000Date(date) + Calendar.DJ00;}
function getJulianDay2(date){return Calendar.DJ00 + getJ2000Date(date) +  getUT(date) / 24.0;}
/***********************************************************************/
