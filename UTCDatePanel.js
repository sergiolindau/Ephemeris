/***********************************************************************
 JavaScript UTCDate Panel
 
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


function fillSelectNumber(s,init,end) {
	sel = document.getElementById(s);
	for (i = init; i <= end; i++) {
		var option = document.createElement("option");
		option.text = i.toString();
		sel.add(option);
	}
}

function fillSelectMonth(s) {
	sel = document.getElementById(s);
	var option = document.createElement("option");
	option.text = "Jan";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Feb";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Mar";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Apr";
	sel.add(option);
	option = document.createElement("option");
	option.text = "May";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Jun";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Jul";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Aug";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Sep";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Oct";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Nov";
	sel.add(option);
	option = document.createElement("option");
	option.text = "Dec";
	sel.add(option);
}

var dayOfWeekString = [
"Sunday",
"Moonday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
];

function setSelectDays(select_element,days) {
	var noptdays = select_element.options.length;
	if (noptdays < days) {
		var doc = select_element.ownerDocument;
		while(select_element.options.length<days) {
			var opt = doc.createElement("option");
			opt.text = select_element.options.length+1;
			if (select_element.add.length === 2){
				select_element.add(opt, null); // standards compliant
			} else{
				select_element.add(opt); // IE only
			}
		}
		doc = null;
	}
	else if (noptdays > days) {
		while(select_element.options.length>days) {
			select_element.options.remove(select_element.options.length-1);
		}
	}
}

var tTickModeNow = true;
var tTickRun = false;
var dateUTC = new UTCDate();
var dateTAI;
var dateTT;
var tTickHandle;

function setTimePanelValues() {
	document.getElementById("UTCYear").value = Math.abs(dateUTC.getUTCFullYear());
	document.getElementById("UTCEra").selectedIndex = (dateUTC.getUTCFullYear()<0)?0:1;
	document.getElementById("UTCMonth").selectedIndex = dateUTC.getUTCMonth();
	setSelectDays(document.getElementById("UTCDay"),dateUTC.getUTCMonthDays());
	document.getElementById("UTCDay").value = dateUTC.getUTCDate();
	document.getElementById("UTCDOW").innerHTML = dayOfWeekString[dateUTC.getUTCDay()];
	document.getElementById("UTCHours").value = dateUTC.getUTCHours();
	document.getElementById("UTCMinutes").value = dateUTC.getUTCMinutes();
	document.getElementById("UTCSeconds").value = dateUTC.getUTCSeconds();
	document.getElementById("UTCMilliseconds").value = dateUTC.getUTCMilliseconds();
	document.getElementById("LocalYear").value = Math.abs(dateUTC.getFullYear());
	document.getElementById("LocalEra").selectedIndex = (dateUTC.getFullYear()<0)?0:1;
	document.getElementById("LocalMonth").selectedIndex = dateUTC.getMonth();
	setSelectDays(document.getElementById("LocalDay"),dateUTC.getLocalMonthDays());
	document.getElementById("LocalDay").value = dateUTC.getDate();
	document.getElementById("LocalDOW").innerHTML = dayOfWeekString[dateUTC.getLocalDay()];
	document.getElementById("LocalHours").value = dateUTC.getHours();
	document.getElementById("LocalMinutes").value = dateUTC.getMinutes();
	document.getElementById("LocalSeconds").value = dateUTC.getSeconds();
	document.getElementById("LocalMilliseconds").value = dateUTC.getMilliseconds();
	document.getElementById("LocalString").innerHTML = dateUTC.toString();
	document.getElementById("UTCString").innerHTML = dateUTC.toUTCString();
	document.getElementById("JSONString").innerHTML = dateUTC.toJSON();
	document.getElementById("JulianDate").value = dateUTC.getJulianDate();
	document.getElementById("ModifiedJulianDate").value = dateUTC.getModifiedJulianDate();
	document.getElementById("JulianDay").value = dateUTC.getJulianDay();
	document.getElementById("UT").value = dateUTC.getUT();
	document.getElementById("Epoch").value = dateUTC.getEpoch();
	document.getElementById("JulianCentury").value = dateUTC.getJulianCentury();

	document.getElementById("TAIJSONString").innerHTML = dateTAI.toJSON();
	document.getElementById("TAIJulianDate").value = dateTAI.getJulianDate();
	document.getElementById("TAIModifiedJulianDate").value = dateTAI.getModifiedJulianDate();
	document.getElementById("TAIJulianDay").value = dateTAI.getJulianDay();
	document.getElementById("TAIUT").value = dateTAI.getUT();
	document.getElementById("TAIEpoch").value = dateTAI.getEpoch();
	document.getElementById("TAIJulianCentury").value = dateTAI.getJulianCentury();

	document.getElementById("TTJSONString").innerHTML = dateTT.toJSON();
	document.getElementById("TTJulianDate").value = dateTT.getJulianDate();
	document.getElementById("TTModifiedJulianDate").value = dateTT.getModifiedJulianDate();
	document.getElementById("TTJulianDay").value = dateTT.getJulianDay();
	document.getElementById("TTUT").value = dateTT.getUT();
	document.getElementById("TTEpoch").value = dateTT.getEpoch();
	document.getElementById("TTJulianCentury").value = dateTT.getJulianCentury();

}


function clockHandleNow() {
	dateUTC.setNow();
	setFromUTC();
	setTimePanelValues();
}

function clockHandleStep() {
	function smonth() {
		var m = dateUTC.getUTCMonth();
		if (m<11) {
			dateUTC.setUTCMonth(m+1);
		}
		else {
			dateUTC.setUTCMonth(0);
			dateUTC.setUTCFullYear(dateUTC.getUTCFullYear()+1);
		}
	}
	function sday() {
		var d = dateUTC.getUTCDate();
		if (d<dateUTC.getUTCMonthDays()) {
			dateUTC.setUTCDate(d+1);
		}
		else {
			dateUTC.setUTCDate(1);
			smonth();
		}
	}
	if (tTickRun) {
		if (document.getElementById("sYear").checked) {
			dateUTC.setUTCFullYear(dateUTC.getUTCFullYear()+1);
		}
		else if (document.getElementById("sMonth").checked) {
			smonth();
		}
		else if (document.getElementById("sDay").checked) {
			sday();
		}
		else if (document.getElementById("sHours").checked) {
			var h = dateUTC.getUTCHours();
			if (h<23) {
				dateUTC.setUTCHours(h+1);
			}
			else {
				dateUTC.setUTCHours(0);
				sday();
			}
		}
		else if (document.getElementById("sMinutes").checked) {
			var m = dateUTC.getMinutes();
			if (m<60) {
				dateUTC.setUTCMinutes(m+1);
			}
			else {
				dateUTC.setUTCMinutes(0);
			}
		}
		else if (document.getElementById("sSeconds").checked) {
			var s = dateUTC.getUTCSeconds();
			if (s<60) {
				dateUTC.setUTCSeconds(s+1);
			}
			else {
				dateUTC.setUTCSeconds(0);
			}
		}
			
	}
	setFromUTC();
	setTimePanelValues();
}

function setNowClick() {
	stopTick();
	dateUTC.setNow();
	setFromUTC();
	setTimePanelValues();
}

function stopTick() {
	if (tTickRun) {
		tTickRun = false;
		document.getElementById("bRun").value = "Run";
		clearInterval(tTickHandle);
	}
}

function runTick() {
	if (tTickModeNow) {
		tTickHandle = setInterval(clockHandleNow, 250);
	}
	else {
		tTickHandle = setInterval(clockHandleStep, 1000);
	}
	document.getElementById("bRun").value = "Stop";
	tTickRun = true;
}

function runClick() {
	if (!tTickRun) {
		runTick();
	}
	else {
		stopTick();
	}
}

function setRunModeNowClick(isNow) {
	if (isNow != tTickModeNow) {
		var state = tTickRun;
		if (tTickRun) {
			stopTick();
		}
		tTickModeNow = document.getElementById("rNow").checked;
		if (state) runTick();
		
	}
}

function setFromUTC() {
	dateTAI = dateUTC.copy();
	dateTAI.UTCtoTAI();
	dateTT = dateTAI.copy();
	dateTT.TAItoTT();
}

function setFromTAI() {
	dateUTC = dateTAI.copy();
	dateUTC.TAItoUTC();
	dateTT = dateTAI.copy();
	dateTT.TAItoTT();
}

function setFromTT() {
	dateTAI = dateTT.copy();
	dateTAI.TTtoTAI();
	dateUTC = dateTAI.copy();
	dateUTC.TAItoUTC();
}

function changeUTCYear() {
	stopTick();
	dateUTC.setUTCFullYear(document.getElementById("UTCYear").value);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCEra() {
	stopTick();
	var d = Math.abs(dateUTC.getUTCFullYear());
	dateUTC.setUTCFullYear((document.getElementById("UTCEra").selectedIndex?1:-1)*d);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCMonth() {
	stopTick();
	dateUTC.setUTCMonth(document.getElementById("UTCMonth").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCDay() {
	stopTick();
	dateUTC.setUTCDate(document.getElementById("UTCDay").selectedIndex+1);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCHours() {
	stopTick();
	dateUTC.setUTCHours(document.getElementById("UTCHours").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCMinutes() {
	stopTick();
	dateUTC.setUTCMinutes(document.getElementById("UTCMinutes").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCSeconds() {
	stopTick();
	dateUTC.setUTCSeconds(document.getElementById("UTCSeconds").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeUTCMilliseconds() {
	stopTick();
	dateUTC.setUTCMilliseconds(document.getElementById("UTCMilliseconds").value);
	setFromUTC();
	setTimePanelValues();
}

function changeLocalYear() {
	stopTick();
	dateUTC.setFullYear(document.getElementById("LocalYear").value);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalEra() {
	stopTick();
	var d = Math.abs(dateUTC.getLocalFullYear());
	dateUTC.setFullYear((document.getElementById("LocalEra").selectedIndex?1:-1)*d);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalMonth() {
	stopTick();
	dateUTC.setMonth(document.getElementById("LocalMonth").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalDay() {
	stopTick();
	dateUTC.setDate(document.getElementById("LocalDay").selectedIndex+1);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalHours() {
	stopTick();
	dateUTC.setHours(document.getElementById("LocalHours").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalMinutes() {
	stopTick();
	dateUTC.setMinutes(document.getElementById("LocalMinutes").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalSeconds() {
	stopTick();
	dateUTC.setSeconds(document.getElementById("LocalSeconds").selectedIndex);
	setFromUTC();
	setTimePanelValues();
}
function changeLocalMilliseconds() {
	stopTick();
	dateUTC.setMilliseconds(document.getElementById("LocalMilliseconds").value);
	setFromUTC();
	setTimePanelValues();
}

function changeJulianDate() {
	stopTick();
	dateUTC.setJulianDate(document.getElementById("JulianDate").value);
	setFromUTC();
	setTimePanelValues();
}
function changeModifiedJulianDate() {
	stopTick();
	dateUTC.setModifiedJulianDate(document.getElementById("ModifiedJulianDate").value);
	setFromUTC();
	setTimePanelValues();
}
function changeJulianDay() {
	stopTick();
	dateUTC.setJulianDay(document.getElementById("JulianDay").value);
	setFromUTC();
	setTimePanelValues();
}
function changeUT() {
	stopTick();
	dateUTC.setUT(document.getElementById("UT").value);
	setFromUTC();
	setTimePanelValues();
}
function changeEpoch() {
	stopTick();
	dateUTC.setEpoch(document.getElementById("Epoch").value);
	setFromUTC();
	setTimePanelValues();
}
function changeJulianCentury() {
	stopTick();
	dateUTC.setJulianCentury(document.getElementById("JulianCentury").value);
	setFromUTC();
	setTimePanelValues();
}

function changeTAIJulianDate() {
	stopTick();
	dateTAI.setJulianDate(document.getElementById("TAIJulianDate").value);
	setFromTAI();
	setTimePanelValues();
}
function changeTAIModifiedJulianDate() {
	stopTick();
	dateTAI.setModifiedJulianDate(document.getElementById("TAIModifiedJulianDate").value);
	setFromTAI();
	setTimePanelValues();
}
function changeTAIJulianDay() {
	stopTick();
	dateTAI.setJulianDay(document.getElementById("TAIJulianDay").value);
	setFromTAI();
	setTimePanelValues();
}
function changeTAIUT() {
	stopTick();
	dateTAI.setUT(document.getElementById("TAIUT").value);
	setFromTAI();
	setTimePanelValues();
}
function changeTAIEpoch() {
	stopTick();
	dateTAI.setEpoch(document.getElementById("TAIEpoch").value);
	setFromTAI();
	setTimePanelValues();
}
function changeTAIJulianCentury() {
	stopTick();
	dateTAI.setJulianCentury(document.getElementById("TAIJulianCentury").value);
	setFromTAI();
	setTimePanelValues();
}

function changeTTJulianDate() {
	stopTick();
	dateTT.setJulianDate(document.getElementById("TTJulianDate").value);
	setFromTT();
	setTimePanelValues();
}
function changeTTModifiedJulianDate() {
	stopTick();
	dateTT.setModifiedJulianDate(document.getElementById("TTModifiedJulianDate").value);
	setFromTT();
	setTimePanelValues();
}
function changeTTJulianDay() {
	stopTick();
	dateTT.setJulianDay(document.getElementById("TTJulianDay").value);
	setFromTT();
	setTimePanelValues();
}
function changeTTUT() {
	stopTick();
	dateTT.setUT(document.getElementById("TTUT").value);
	setFromTT();
	setTimePanelValues();
}
function changeTTEpoch() {
	stopTick();
	dateTT.setEpoch(document.getElementById("TTEpoch").value);
	setFromTT();
	setTimePanelValues();
}
function changeTTJulianCentury() {
	stopTick();
	dateTT.setJulianCentury(document.getElementById("TTJulianCentury").value);
	setFromTT();
	setTimePanelValues();
}
function initUTCDatePanel() {
	fillSelectMonth("UTCMonth");
	fillSelectNumber("UTCDay",1,31);
	fillSelectNumber("UTCHours",0,23);
	fillSelectNumber("UTCMinutes",0,59);
	fillSelectNumber("UTCSeconds",0,59);

	fillSelectMonth("LocalMonth");
	fillSelectNumber("LocalDay",1,31);
	fillSelectNumber("LocalHours",0,23);
	fillSelectNumber("LocalMinutes",0,59);
	fillSelectNumber("LocalSeconds",0,59);
}