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

dateUTC.setStartAction(
	function(){
		$.$.c("RunStop")[0].value = "Stop";
		$.$.c("RunStop")[1].value = "Stop";
});

dateUTC.setStopAction(
	function(){
		$.$.c("RunStop")[0].value = "Run";
		$.$.c("RunStop")[1].value = "Run";
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
	$.$.i("UTCISOString").innerHTML = dateUTC.toISOString();
	$.$.i("UTCString").innerHTML = dateUTC.toUTCString();
	$.$.i("UTCYear").value = Math.abs(dateUTC.getUTCFullYear());
	$.$.i("UTCEra").selectedIndex = (dateUTC.getUTCFullYear()<0)?0:1;
	$.$.i("UTCLeapYear").checked = dateUTC.isUTCLeapYear();
	$.$.i("UTCMonth").selectedIndex = dateUTC.getUTCMonth();
	setSelectDate($.$.i("UTCDate"),dateUTC.getUTCMonthDays());
	$.$.i("UTCDate").value = dateUTC.getUTCDate();
	$.$.i("UTCDay").selectedIndex = dateUTC.getUTCDay();
	$.$.i("UTCHours").value = dateUTC.getUTCHours();
	$.$.i("UTCMinutes").value = dateUTC.getUTCMinutes();
	$.$.i("UTCSeconds").value = dateUTC.getUTCSeconds();
	$.$.i("UTCMilliseconds").value = DateTime.pad3(dateUTC.getUTCMilliseconds());

	$.$.i("LocalString").innerHTML = dateUTC.toString();
	$.$.i("LocalYear").value = Math.abs(dateUTC.getFullYear());
	$.$.i("LocalEra").selectedIndex = (dateUTC.getFullYear()<0)?0:1;
	$.$.i("LocalLeapYear").checked = dateUTC.isLocalLeapYear();
	$.$.i("LocalMonth").selectedIndex = dateUTC.getMonth();
	setSelectDate($.$.i("LocalDate"),dateUTC.getLocalMonthDays());
	$.$.i("LocalDate").value = dateUTC.getDate();
	$.$.i("LocalDay").selectedIndex = dateUTC.getLocalDay();
	$.$.i("LocalHours").value = dateUTC.getHours();
	$.$.i("LocalMinutes").value = dateUTC.getMinutes();
	$.$.i("LocalSeconds").value = dateUTC.getSeconds();
	$.$.i("LocalMilliseconds").value = DateTime.pad3(dateUTC.getMilliseconds());
	$.$.i("DaylightSavingTime").checked = dateUTC.isDST();
	$.$.i("DaylightSavingTime").disabled = dateUTC.getIsLocal();
	$.$.i("TimezoneAdjust").value = dateUTC.getTimezoneOffset();
	
	$.$.i("JulianDate").value = dateUTC.getJulianDate();
	$.$.i("ModifiedJulianDate").value = dateUTC.getModifiedJulianDate();
	$.$.i("JulianDay").value = dateUTC.getJulianDay();
	$.$.i("UT").value = dateUTC.getUT();
	$.$.i("Epoch").value = dateUTC.getEpoch();
	$.$.i("JulianCentury").value = dateUTC.getJulianCentury();

	$.$.i("TAIISOString").innerHTML = dateTAI.toJSON();
	$.$.i("TAIJulianDate").value = dateTAI.getJulianDate();
	$.$.i("TAIModifiedJulianDate").value = dateTAI.getModifiedJulianDate();
	$.$.i("TAIJulianDay").value = dateTAI.getJulianDay();
	$.$.i("TAIUT").value = dateTAI.getUT();
	$.$.i("TAIEpoch").value = dateTAI.getEpoch();
	$.$.i("TAIJulianCentury").value = dateTAI.getJulianCentury();

	$.$.i("TTISOString").innerHTML = dateTT.toJSON();
	$.$.i("TTJulianDate").value = dateTT.getJulianDate();
	$.$.i("TTModifiedJulianDate").value = dateTT.getModifiedJulianDate();
	$.$.i("TTJulianDay").value = dateTT.getJulianDay();
	$.$.i("TTUT").value = dateTT.getUT();
	$.$.i("TTEpoch").value = dateTT.getEpoch();
	$.$.i("TTJulianCentury").value = dateTT.getJulianCentury();

	$.$.i("TCGISOString").innerHTML = dateTCG.toJSON();
	$.$.i("TCGJulianDate").value = dateTCG.getJulianDate();
	$.$.i("TCGModifiedJulianDate").value = dateTCG.getModifiedJulianDate();
	$.$.i("TCGJulianDay").value = dateTCG.getJulianDay();
	$.$.i("TCGUT").value = dateTCG.getUT();
	$.$.i("TCGEpoch").value = dateTCG.getEpoch();
	$.$.i("TCGJulianCentury").value = dateTCG.getJulianCentury();

	for(var i=0;i<panelRefreshActions.length;i++){
		panelRefreshActions[i]();
	}
}

function getStepPanelValue() {
		if ($.$.i("sYear").checked) {
			return 6;
		}
		else if ($.$.i("sMonth").checked) {
			return 5;
		}
		else if ($.$.i("sDay").checked) {
			return 4;
		}
		else if ($.$.i("sHours").checked) {
			return 3;
		}
		else if ($.$.i("sMinutes").checked) {
			return 2;
		}
		else if ($.$.i("sSeconds").checked) {
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
	updateEphemerisPanel();
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
	dateUTC.setUTCFullYear($.$.i("UTCYear").value);
	panelUpdate(dateUTC);
}
function changeUTCEra() {
	dateUTC.stop();
	var d = Math.abs(dateUTC.getUTCFullYear());
	dateUTC.setUTCFullYear(($.$.i("UTCEra").selectedIndex?1:-1)*d);
	panelUpdate(dateUTC);
}
function changeUTCMonth() {
	dateUTC.stop();
	dateUTC.setUTCMonth($.$.i("UTCMonth").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCDate() {
	dateUTC.stop();
	dateUTC.setUTCDate($.$.i("UTCDate").selectedIndex+1);
	panelUpdate(dateUTC);
}
function changeUTCHours() {
	dateUTC.stop();
	dateUTC.setUTCHours($.$.i("UTCHours").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCMinutes() {
	dateUTC.stop();
	dateUTC.setUTCMinutes($.$.i("UTCMinutes").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCSeconds() {
	dateUTC.stop();
	dateUTC.setUTCSeconds($.$.i("UTCSeconds").selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCMilliseconds() {
	dateUTC.stop();
	dateUTC.setUTCMilliseconds($.$.i("UTCMilliseconds").value);
	panelUpdate(dateUTC);
}

/***********************************************************************
	Change Local DateTime Panel
***********************************************************************/
function changeLocalYear() {
	dateUTC.stop();
	dateUTC.setFullYear($.$.i("LocalYear").value);
	panelUpdate(dateUTC);
}
function changeLocalEra() {
	dateUTC.stop();
	var d = Math.abs(dateUTC.getLocalFullYear());
	dateUTC.setFullYear(($.$.i("LocalEra").selectedIndex?1:-1)*d);
	panelUpdate(dateUTC);
}
function changeLocalMonth() {
	dateUTC.stop();
	dateUTC.setMonth($.$.i("LocalMonth").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalDate() {
	dateUTC.stop();
	dateUTC.setDate($.$.i("LocalDate").selectedIndex+1);
	panelUpdate(dateUTC);
}
function changeLocalHours() {
	dateUTC.stop();
	dateUTC.setHours($.$.i("LocalHours").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalMinutes() {
	dateUTC.stop();
	dateUTC.setMinutes($.$.i("LocalMinutes").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalSeconds() {
	dateUTC.stop();
	dateUTC.setSeconds($.$.i("LocalSeconds").selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalMilliseconds() {
	dateUTC.stop();
	dateUTC.setMilliseconds($.$.i("LocalMilliseconds").value);
	panelUpdate(dateUTC);
}
function changeTZAdjust() {
	dateUTC.setLocalTZOffset(parseInt($.$.i("TimezoneAdjust").value));
	panelUpdate(dateUTC);
}
function focusTZAdjust() {
	dateUTC.stop();
}
function changeDaylightSavingTime() {
	dateUTC.stop();
	dateUTC.setDSTOffset($.$.i("DaylightSavingTime").checked?60:0);
	panelUpdate(dateUTC);
}
/***********************************************************************
	Change UTC Panel
***********************************************************************/
function changeJulianDate() {
	dateUTC.stop();
	dateUTC.setJulianDate($.$.i("JulianDate").value);
	panelUpdate(dateUTC);
}
function changeModifiedJulianDate() {
	dateUTC.stop();
	dateUTC.setModifiedJulianDate($.$.i("ModifiedJulianDate").value);
	panelUpdate(dateUTC);
}
function changeJulianDay() {
	dateUTC.stop();
	dateUTC.setJulianDay($.$.i("JulianDay").value);
	panelUpdate(dateUTC);
}
function changeUT() {
	dateUTC.stop();
	dateUTC.setUT($.$.i("UT").value);
	panelUpdate(dateUTC);
}
function changeEpoch() {
	dateUTC.stop();
	dateUTC.setEpoch($.$.i("Epoch").value);
	panelUpdate(dateUTC);
}
function changeJulianCentury() {
	dateUTC.stop();
	dateUTC.setJulianCentury($.$.i("JulianCentury").value);
	panelUpdate(dateUTC);
}

/***********************************************************************
	Change TAI Panel
***********************************************************************/
function changeTAIJulianDate() {
	dateUTC.stop();
	dateTAI.setJulianDate($.$.i("TAIJulianDate").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIModifiedJulianDate() {
	dateUTC.stop();
	dateTAI.setModifiedJulianDate($.$.i("TAIModifiedJulianDate").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIJulianDay() {
	dateUTC.stop();
	dateTAI.setJulianDay($.$.i("TAIJulianDay").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIUT() {
	dateUTC.stop();
	dateTAI.setUT($.$.i("TAIUT").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIEpoch() {
	dateUTC.stop();
	dateTAI.setEpoch($.$.i("TAIEpoch").value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIJulianCentury() {
	dateUTC.stop();
	dateTAI.setJulianCentury($.$.i("TAIJulianCentury").value);
	setFromTAI();
	updateDateTimePanel();
}

/***********************************************************************
	Change TT Panel
***********************************************************************/
function changeTTJulianDate() {
	dateUTC.stop();
	dateTT.setJulianDate($.$.i("TTJulianDate").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTModifiedJulianDate() {
	dateUTC.stop();
	dateTT.setModifiedJulianDate($.$.i("TTModifiedJulianDate").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTJulianDay() {
	dateUTC.stop();
	dateTT.setJulianDay($.$.i("TTJulianDay").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTUT() {
	dateUTC.stop();
	dateTT.setUT($.$.i("TTUT").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTEpoch() {
	dateUTC.stop();
	dateTT.setEpoch($.$.i("TTEpoch").value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTJulianCentury() {
	dateUTC.stop();
	dateTT.setJulianCentury($.$.i("TTJulianCentury").value);
	setFromTT();
	updateDateTimePanel();
}

/***********************************************************************
	Change TCG Panel
***********************************************************************/
function changeTCGJulianDate() {
	dateUTC.stop();
	dateTCG.setJulianDate($.$.i("TCGJulianDate").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGModifiedJulianDate() {
	dateUTC.stop();
	dateTCG.setModifiedJulianDate($.$.i("TCGModifiedJulianDate").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGJulianDay() {
	dateUTC.stop();
	dateTCG.setJulianDay($.$.i("TCGJulianDay").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGUT() {
	dateUTC.stop();
	dateTCG.setUT($.$.i("TCGUT").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGEpoch() {
	dateUTC.stop();
	dateTCG.setEpoch($.$.i("TCGEpoch").value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGJulianCentury() {
	dateUTC.stop();
	dateTCG.setJulianCentury($.$.i("TCGJulianCentury").value);
	setFromTCG();
	updateDateTimePanel();
}