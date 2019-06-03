/***********************************************************************
 Useful interface routines for Javascript
 
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
function pad(data,n,c) {
	if (typeof(data)=='number') {
		if (arguments.length>1) {
			switch(n) {
				case 0:
				case 1:
					return ""+data;
				case 2:
					return data<10 ? c+data : ""+data;
				case 3:
					if (data<100) {
						if (data<10) return c+c+data
						else return c+data;
					}
					else return data;
				default:
					temp = ""+data;
					while(temp.length<n) temp = c + temp;
					return temp;
			}
		}
		else {
		    return data<10 ? c+data : ""+data;
		}
	}
}

function fillSelectNumber(s,init,end) {
	sel = document.getElementById(s);
	for (i = init; i <= end; i++) {
		var option = document.createElement("option");
		option.text = i.toString();
		sel.add(option);
	}
}

function fillSelectString(s,sarray) {
	sel = document.getElementById(s);
	var option;
	for (i=0;i<sarray.length;i++) {
		option = document.createElement("option");
		option.text = sarray[i];
		sel.add(option);
	}
}

	function isNumber(inputVal) 
	{
		var oneDecimal = false;
		var inputStr = "" + inputVal;
		for (var i = 0; i < inputStr.length; i++) 
		{
			var oneChar = inputStr.charAt(i);
			if (i == 0 && (oneChar == "-" || oneChar == "+"))
			{
				continue;
			}
			if (oneChar == "." && !oneDecimal) 
			{
				oneDecimal = true;
				continue;
			}
			if (oneChar < "0" || oneChar > "9")
			{
				return false;
			}
		}
		return true;
	}
//***********************************************************************/
//* Name:    calcDayFromJD								*/
//* Type:    Function									*/
//* Purpose: Calendar day (minus year) from Julian Day			*/
//* Arguments:										*/
//*   jd   : Julian Day									*/
//* Return value:										*/
//*   String date in the form DD-MONTH						*/
//***********************************************************************/

	function calcDayFromJD(jd)
	{
		var temp = new DateTime()
		temp.setJulianDay(jd);
		var result;
	}


//***********************************************************************/
//* Name:    timeString									*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields			*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//* Return value:										*/
//*   string of the format HH:MM:SS, minutes and seconds are zero padded*/
//***********************************************************************/

	function timeString(minutes)
	// timeString returns a zero-padded string (HH:MM:SS) given time in minutes
	{
		var floatHour = minutes / 60.0;
		var hour = Math.floor(floatHour);
		var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec + 0.5);
		if (second > 59) {
			second = 0;
			minute += 1;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ":";
		else
			timeStr += minute + ":";
		if (second < 10)	//	i.e. only one digit
			timeStr += "0" + second;
		else
			timeStr += second;

		return timeStr;
	}


//***********************************************************************/
//* Name:    timeStringShortAMPM							*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields.  If time	*/
//*		crosses a day boundary, date is appended.				*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM[AM/PM] (DDMon)					*/
//***********************************************************************/

// timeStringShortAMPM returns a zero-padded string (HH:MM *M) given time in 
// minutes and appends short date if time is > 24 or < 0, resp.

	function timeStringShortAMPM(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60.0;
		var hour = Math.floor(floatHour);
		var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec + 0.5);
		var PM = false;

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			daychange = true;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			daychange = true;
			julianday -= 1.0;
		}

		if (hour > 12)
		{
			hour -= 12;
			PM = true;
		}

            if (hour == 12)
		{
              PM = true;
            }

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += "" + minute + ((PM)?"PM":"AM");

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}


//***********************************************************************/
//* Name:    timeStringAMPMDate							*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields, and appends	*/
//*		the date.									*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM[AM/PM] DDMon					*/
//***********************************************************************/

// timeStringAMPMDate returns a zero-padded string (HH:MM[AM/PM]) given time 
// in minutes and julian day, and appends the short date

	function timeStringAMPMDate(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60.0;
		var hour = Math.floor(floatHour);
		var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec + 0.5);

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		if (hour > 23) 
		{
			hour -= 24;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			julianday -= 1.0;
		}

		var PM = false;
		if (hour > 12)
		{
			hour -= 12;
			PM = true;
		}

        if (hour == 12)
		{
            PM = true;
        }

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += minute + ((PM)?"PM":"AM");

		return timeStr + " " + calcDayFromJD(julianday);
	}


//***********************************************************************/
//* Name:    timeStringDate								*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded 24hr time	*/
//*		suitable for printing to the form text fields.  If time	*/
//*		crosses a day boundary, date is appended.				*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM (DDMon)						*/
//***********************************************************************/

// timeStringDate returns a zero-padded string (HH:MM) given time in minutes
// and julian day, and appends the short date if time crosses a day boundary

	function timeStringDate(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60.0;
		var hour = Math.floor(floatHour);
		var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec + 0.5);

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			julianday += 1.0;
			daychange = true;
		}

		if (hour < 0)
		{
			hour += 24;
			julianday -= 1.0;
			daychange = true;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute;
		else
			timeStr += minute;

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}
