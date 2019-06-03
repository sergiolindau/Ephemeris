/***********************************************************************
 JavaScript DateTime Panel
 
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
//http://www.htmldockfloat.com/demo/JavaScriptDockFloatSimpleDemo.html

//addLanguageChangeHandle(function(code){console.log("language change: "+code)});

function setSelectDate(select_element,days) {
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

function initDateTimePanel() {
	fillSelectNumber("UTCDate",1,31);
	fillSelectNumber("UTCHours",0,23);
	fillSelectNumber("UTCMinutes",0,59);
	fillSelectNumber("UTCSeconds",0,59);

	fillSelectNumber("LocalDate",1,31);
	fillSelectNumber("LocalHours",0,23);
	fillSelectNumber("LocalMinutes",0,59);
	fillSelectNumber("LocalSeconds",0,59);
}

var dateUTC = new DateTimeTick(), dateTAI, dateTT, dateTCG;

dateUTC.setStartAction(function(){
	document.getElementById("RunStop").value = "Stop";
});

dateUTC.setStopAction(
	function(){document.getElementById("RunStop").value = "Run";
});

//alert(dateUTC.oldMethods.getFullYear());
/***********************************************************************
	Time Scales conversion
***********************************************************************/
function setFromUTC() {
	dateTAI = dateUTC.copy();
	dateTAI.UTCtoTAI();
	dateTT = dateTAI.copy();
	dateTT.TAItoTT();
	dateTCG = dateTT.copy();
	dateTCG.TTtoTCG();
}

function setFromTAI() {
	dateUTC = dateTAI.copy();
	dateUTC.TAItoUTC();
	dateTT = dateTAI.copy();
	dateTT.TAItoTT();
	dateTCG = dateTT.copy();
	dateTCG.TTtoTCG();
}

function setFromTT() {
	dateTAI = dateTT.copy();
	dateTAI.TTtoTAI();
	dateUTC = dateTAI.copy();
	dateUTC.TAItoUTC();
	dateTCG = dateTT.copy();
	dateTCG.TTtoTCG();
}

function setFromTCG() {
	dateTT = dateTCG.copy();
	dateTT.TCGtoTT();
	dateTAI = dateTT.copy();
	dateTAI.TTtoTAI();
	dateUTC = dateTAI.copy();
	dateUTC.TAItoUTC();
}

var panelRefreshActions = [];
function addPanelRefreshAction(func){
	panelRefreshActions.push(func);
}

function updateDateTimePanel() {
	document.getElementById("UTCISOString").innerHTML = dateUTC.toISOString();
	document.getElementById("UTCString").innerHTML = dateUTC.toUTCString();
	document.getElementById("UTCYear").value = Math.abs(dateUTC.getUTCFullYear());
	document.getElementById("UTCEra").selectedIndex = (dateUTC.getUTCFullYear()<0)?0:1;
	document.getElementById("UTCLeapYear").checked = dateUTC.isUTCLeapYear();
	document.getElementById("UTCMonth").selectedIndex = dateUTC.getUTCMonth();
	setSelectDate(document.getElementById("UTCDate"),dateUTC.getUTCMonthDays());
	document.getElementById("UTCDate").value = dateUTC.getUTCDate();
	document.getElementById("UTCDay").selectedIndex = dateUTC.getUTCDay();
	document.getElementById("UTCHours").value = dateUTC.getUTCHours();
	document.getElementById("UTCMinutes").value = dateUTC.getUTCMinutes();
	document.getElementById("UTCSeconds").value = dateUTC.getUTCSeconds();
	document.getElementById("UTCMilliseconds").value = DateTime.pad3(dateUTC.getUTCMilliseconds());

	document.getElementById("LocalString").innerHTML = dateUTC.toString();
	document.getElementById("LocalYear").value = Math.abs(dateUTC.getFullYear());
	document.getElementById("LocalEra").selectedIndex = (dateUTC.getFullYear()<0)?0:1;
	document.getElementById("LocalLeapYear").checked = dateUTC.isLocalLeapYear();
	document.getElementById("LocalMonth").selectedIndex = dateUTC.getMonth();
	setSelectDate(document.getElementById("LocalDate"),dateUTC.getLocalMonthDays());
	document.getElementById("LocalDate").value = dateUTC.getDate();
	document.getElementById("LocalDay").selectedIndex = dateUTC.getLocalDay();
	document.getElementById("LocalHours").value = dateUTC.getHours();
	document.getElementById("LocalMinutes").value = dateUTC.getMinutes();
	document.getElementById("LocalSeconds").value = dateUTC.getSeconds();
	document.getElementById("LocalMilliseconds").value = DateTime.pad3(dateUTC.getMilliseconds());
	document.getElementById("DaylightSavingTime").checked = dateUTC.isDST();
	document.getElementById("DaylightSavingTime").disabled = dateUTC.getIsLocal();
	document.getElementById("TimezoneAdjust").value = dateUTC.getTimezoneOffset();
	
	document.getElementById("JulianDate").value = dateUTC.getJulianDate();
	document.getElementById("ModifiedJulianDate").value = dateUTC.getModifiedJulianDate();
	document.getElementById("JulianDay").value = dateUTC.getJulianDay();
	document.getElementById("UT").value = dateUTC.getUT();
	document.getElementById("Epoch").value = dateUTC.getEpoch();
	document.getElementById("JulianCentury").value = dateUTC.getJulianCentury();

	document.getElementById("TAIISOString").innerHTML = dateTAI.toJSON();
	document.getElementById("TAIJulianDate").value = dateTAI.getJulianDate();
	document.getElementById("TAIModifiedJulianDate").value = dateTAI.getModifiedJulianDate();
	document.getElementById("TAIJulianDay").value = dateTAI.getJulianDay();
	document.getElementById("TAIUT").value = dateTAI.getUT();
	document.getElementById("TAIEpoch").value = dateTAI.getEpoch();
	document.getElementById("TAIJulianCentury").value = dateTAI.getJulianCentury();

	document.getElementById("TTISOString").innerHTML = dateTT.toJSON();
	document.getElementById("TTJulianDate").value = dateTT.getJulianDate();
	document.getElementById("TTModifiedJulianDate").value = dateTT.getModifiedJulianDate();
	document.getElementById("TTJulianDay").value = dateTT.getJulianDay();
	document.getElementById("TTUT").value = dateTT.getUT();
	document.getElementById("TTEpoch").value = dateTT.getEpoch();
	document.getElementById("TTJulianCentury").value = dateTT.getJulianCentury();

	document.getElementById("TCGISOString").innerHTML = dateTCG.toJSON();
	document.getElementById("TCGJulianDate").value = dateTCG.getJulianDate();
	document.getElementById("TCGModifiedJulianDate").value = dateTCG.getModifiedJulianDate();
	document.getElementById("TCGJulianDay").value = dateTCG.getJulianDay();
	document.getElementById("TCGUT").value = dateTCG.getUT();
	document.getElementById("TCGEpoch").value = dateTCG.getEpoch();
	document.getElementById("TCGJulianCentury").value = dateTCG.getJulianCentury();

	for(var i=0;i<panelRefreshActions.length;i++){
		panelRefreshActions[i]();
	}
}

function getStepPanelValue() {
		if (document.getElementById("sYear").checked) {
			return 6;
		}
		else if (document.getElementById("sMonth").checked) {
			return 5;
		}
		else if (document.getElementById("sDay").checked) {
			return 4;
		}
		else if (document.getElementById("sHours").checked) {
			return 3;
		}
		else if (document.getElementById("sMinutes").checked) {
			return 2;
		}
		else if (document.getElementById("sSeconds").checked) {
			return 1;
		}
		else {
			return 0;
		}
}

function changeStepPanelValue() {
	dateUTC.setStepDateTime(getStepPanelValue());
}

function panelUpdate(date){
	setFromUTC();
	updateDateTimePanel();
}
//dateUTC.runAction = panelUpdate;
dateUTC.setRunAction(panelUpdate);

/***********************************************************************
	DateTime Panel element events (click, change, ...)
***********************************************************************/
function clickNow() {
	dateUTC.stop();
	dateUTC.setNow();
	panelUpdate(dateUTC);
}

var clickRunStop = dateUTC.runStop;

function clickSetRunModeNow(isNow) {
	dateUTC.setRunModeNow(isNow,isNow?250:1000,1,getStepPanelValue());
}

/***********************************************************************
	Change UTC DateTime Panel
***********************************************************************/
function changeUTCYear() {
	dateUTC.stop();
	dateUTC.setUTCFullYear(document.getElementById("UTCYear").value);
	panelUpdate(dateUTC);
}
function changeUTCEra() {
	dateUTC.stop();
	var d = Math.abs(dateUTC.getUTCFullYear());
	dateUTC.setUTCFullYear((document.getElementById("UTCEra").selectedIndex?1:-1)*d);
	panelUpdate(dateUTC);
}
function changeUTCMonth() {
	dateUTC.stop();
	dateUTC.setUTCMonth(document.getElementById("UTCMonth").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCDate() {
	dateUTC.stop();
	dateUTC.setUTCDate(document.getElementById("UTCDate").selectedIndex+1);
	panelUpdate(dateUTC);
}
function changeUTCHours() {
	dateUTC.stop();
	dateUTC.setUTCHours(document.getElementById("UTCHours").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCMinutes() {
	dateUTC.stop();
	dateUTC.setUTCMinutes(document.getElementById("UTCMinutes").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCSeconds() {
	dateUTC.stop();
	dateUTC.setUTCSeconds(document.getElementById("UTCSeconds").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCMilliseconds() {
	dateUTC.stop();
	dateUTC.setUTCMilliseconds(document.getElementById("UTCMilliseconds").value);
	panelUpdate(dateUTC);
}

/***********************************************************************
	Change Local DateTime Panel
***********************************************************************/
function changeLocalYear() {
	dateUTC.stop();
	dateUTC.setFullYear(document.getElementById("LocalYear").value);
	panelUpdate(dateUTC);
}
function changeLocalEra() {
	dateUTC.stop();
	var d = Math.abs(dateUTC.getLocalFullYear());
	dateUTC.setFullYear((document.getElementById("LocalEra").selectedIndex?1:-1)*d);
	panelUpdate(dateUTC);
}
function changeLocalMonth() {
	dateUTC.stop();
	dateUTC.setMonth(document.getElementById("LocalMonth").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalDate() {
	dateUTC.stop();
	dateUTC.setDate(document.getElementById("LocalDate").selectedIndex+1);
	panelUpdate(dateUTC);
}
function changeLocalHours() {
	dateUTC.stop();
	dateUTC.setHours(document.getElementById("LocalHours").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalMinutes() {
	dateUTC.stop();
	dateUTC.setMinutes(document.getElementById("LocalMinutes").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalSeconds() {
	dateUTC.stop();
	dateUTC.setSeconds(document.getElementById("LocalSeconds").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalMilliseconds() {
	dateUTC.stop();
	dateUTC.setMilliseconds(document.getElementById("LocalMilliseconds").value);
	panelUpdate(dateUTC);
}
function changeTZAdjust() {
	dateUTC.setLocalTZOffset(parseInt(document.getElementById("TimezoneAdjust").value));
	panelUpdate(dateUTC);
}
function focusTZAdjust() {
	dateUTC.stop();
}
function changeDaylightSavingTime() {
	dateUTC.stop();
	dateUTC.setDSTOffset(document.getElementById("DaylightSavingTime").checked?60:0);
	panelUpdate(dateUTC);
}
/***********************************************************************
	Change UTC Panel
***********************************************************************/
function changeJulianDate() {
	dateUTC.stop();
	dateUTC.setJulianDate(document.getElementById("JulianDate").value);
	panelUpdate(dateUTC);
}
function changeModifiedJulianDate() {
	dateUTC.stop();
	dateUTC.setModifiedJulianDate(document.getElementById("ModifiedJulianDate").value);
	panelUpdate(dateUTC);
}
function changeJulianDay() {
	dateUTC.stop();
	dateUTC.setJulianDay(document.getElementById("JulianDay").value);
	panelUpdate(dateUTC);
}
function changeUT() {
	dateUTC.stop();
	dateUTC.setUT(document.getElementById("UT").value);
	panelUpdate(dateUTC);
}
function changeEpoch() {
	dateUTC.stop();
	dateUTC.setEpoch(document.getElementById("Epoch").value);
	panelUpdate(dateUTC);
}
function changeJulianCentury() {
	dateUTC.stop();
	dateUTC.setJulianCentury(document.getElementById("JulianCentury").value);
	panelUpdate(dateUTC);
}

/***********************************************************************
	Change TAI Panel
***********************************************************************/
function changeTAIJulianDate() {
	dateUTC.stop();
	dateTAI.setJulianDate(document.getElementById("TAIJulianDate").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIModifiedJulianDate() {
	dateUTC.stop();
	dateTAI.setModifiedJulianDate(document.getElementById("TAIModifiedJulianDate").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIJulianDay() {
	dateUTC.stop();
	dateTAI.setJulianDay(document.getElementById("TAIJulianDay").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIUT() {
	dateUTC.stop();
	dateTAI.setUT(document.getElementById("TAIUT").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIEpoch() {
	dateUTC.stop();
	dateTAI.setEpoch(document.getElementById("TAIEpoch").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIJulianCentury() {
	dateUTC.stop();
	dateTAI.setJulianCentury(document.getElementById("TAIJulianCentury").value);
	setFromTAI();
	updateDateTimePanel();
}

/***********************************************************************
	Change TT Panel
***********************************************************************/
function changeTTJulianDate() {
	dateUTC.stop();
	dateTT.setJulianDate(document.getElementById("TTJulianDate").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTModifiedJulianDate() {
	dateUTC.stop();
	dateTT.setModifiedJulianDate(document.getElementById("TTModifiedJulianDate").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTJulianDay() {
	dateUTC.stop();
	dateTT.setJulianDay(document.getElementById("TTJulianDay").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTUT() {
	dateUTC.stop();
	dateTT.setUT(document.getElementById("TTUT").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTEpoch() {
	dateUTC.stop();
	dateTT.setEpoch(document.getElementById("TTEpoch").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTJulianCentury() {
	dateUTC.stop();
	dateTT.setJulianCentury(document.getElementById("TTJulianCentury").value);
	setFromTT();
	updateDateTimePanel();
}

/***********************************************************************
	Change TCG Panel
***********************************************************************/
function changeTCGJulianDate() {
	dateUTC.stop();
	dateTCG.setJulianDate(document.getElementById("TCGJulianDate").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGModifiedJulianDate() {
	dateUTC.stop();
	dateTCG.setModifiedJulianDate(document.getElementById("TCGModifiedJulianDate").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGJulianDay() {
	dateUTC.stop();
	dateTCG.setJulianDay(document.getElementById("TCGJulianDay").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGUT() {
	dateUTC.stop();
	dateTCG.setUT(document.getElementById("TCGUT").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGEpoch() {
	dateUTC.stop();
	dateTCG.setEpoch(document.getElementById("TCGEpoch").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGJulianCentury() {
	dateUTC.stop();
	dateTCG.setJulianCentury(document.getElementById("TCGJulianCentury").value);
	setFromTCG();
	updateDateTimePanel();
}