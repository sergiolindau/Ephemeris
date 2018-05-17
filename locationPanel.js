/***********************************************************************
 JavaScript location Panel
 
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



/***********************************************************************/
var mylocation;
var	latdegminsec = [1,0,0,0];
var lngdegminsec = [1,0,0,0];

var TheLocation = new GeoLocation();

var map, marker;

TheLocation.onset = function(pos){ 
	mylocation = pos;
	latdegminsec = decimalToDegreeMinSec(pos.lat);
	lngdegminsec = decimalToDegreeMinSec(pos.lng);
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: TheLocation.position,
      zoom: 15,
	  mapTypeId: google.maps.MapTypeId.HYBRID
    });
	// Place a draggable marker on the map
	marker = new google.maps.Marker({
		position: pos,
		map: map,
		draggable:true
	});

  marker.addListener('dragend', function(m) {
	mylocation.lat = m.latLng.lat();
	mylocation.lng = m.latLng.lng();
	latdegminsec = decimalToDegreeMinSec(mylocation.lat);
	lngdegminsec = decimalToDegreeMinSec(mylocation.lng);
	setLatDegreeMinSecValues();
	setLngDegreeMinSecValues();
	setLatDecimalValues();
	setLngDecimalValues();
  });
	setLatDegreeMinSecValues();
	setLngDegreeMinSecValues();
	setLatDecimalValues();
	setLngDecimalValues();
};

function setFromLatDegreeMinSec() {
	mylocation.lat = degreeMinSecToDecimal(latdegminsec);
	document.getElementById("latdegreedecimal").value = mylocation.lat;
}

function setFromLngDegreeMinSec() {
	mylocation.lng = degreeMinSecToDecimal(lngdegminsec);
	document.getElementById("lngdegreedecimal").value = mylocation.lng;
}

function setLatDegreeMinSecValues() {
	document.getElementById("latdegree").selectedIndex = latdegminsec[1];
	document.getElementById("latminutes").selectedIndex = latdegminsec[2];
	document.getElementById("latseconds").selectedIndex = latdegminsec[3];
	if (latdegminsec[0]>=0) {
		document.getElementById("latdirection").selectedIndex = 0;
	}
	else {
		document.getElementById("latdirection").selectedIndex = 1;
	}
}

function setLatDecimalValues() {
	document.getElementById("latdegreedecimal").value = mylocation.lat;
}

function setLngDegreeMinSecValues() {
	document.getElementById("lngdegree").selectedIndex = lngdegminsec[1];
	document.getElementById("lngminutes").selectedIndex = lngdegminsec[2];
	document.getElementById("lngseconds").selectedIndex = lngdegminsec[3];
	if (lngdegminsec[0]>=0) {
		document.getElementById("lngdirection").selectedIndex = 0;
	}
	else {
		document.getElementById("lngdirection").selectedIndex = 1;
	}
}

function setLngDecimalValues() {
	document.getElementById("lngdegreedecimal").value = mylocation.lng;
}

function changeLatDegreeDecimal() {
	mylocation.lat = parseFloat(document.getElementById("latdegreedecimal").value);
	latdegminsec = decimalToDegreeMinSec(mylocation.lat);
	setLatDegreeMinSecValues();
	marker.setPosition(mylocation);
}

function changeLatDegree() {
	latdegminsec[1] = document.getElementById("latdegree").selectedIndex;
	setFromLatDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLatMinutes() {
	latdegminsec[2] = document.getElementById("latminutes").selectedIndex;
	setFromLatDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLatSeconds() {
	latdegminsec[3] = document.getElementById("latseconds").selectedIndex;
	setFromLatDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLatDirection() {
	latdegminsec[0] = document.getElementById("latdirection").selectedIndex?-1:1;
	setFromLatDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLngDegreeDecimal() {
	mylocation.lng = parseFloat(document.getElementById("lngdegreedecimal").value);
	lngdegminsec = decimalToDegreeMinSec(mylocation.lng);
	setLngDegreeMinSecValues();
	marker.setPosition(mylocation);
}

function changeLngDegree() {
	lngdegminsec[1] = document.getElementById("lngdegree").selectedIndex;
	setFromLngDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLngMinutes() {
	lngdegminsec[2] = document.getElementById("lngminutes").selectedIndex;
	setFromLngDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLngSeconds() {
	lngdegminsec[3] = document.getElementById("lngseconds").selectedIndex;
	setFromLngDegreeMinSec();
	marker.setPosition(mylocation);
}

function changeLngDirection() {
	lngdegminsec[0] = document.getElementById("lngdirection").selectedIndex?-1:1;
	setFromLngDegreeMinSec();
	marker.setPosition(mylocation);
}

function initLocationPanel() {
	fillSelectNumber("latdegree",0,90);
	fillSelectNumber("latminutes",0,59);
	fillSelectNumber("latseconds",0,59);
	fillSelectNumber("lngdegree",0,180);
	fillSelectNumber("lngminutes",0,59);
	fillSelectNumber("lngseconds",0,59);
}

TheLocation.getLocation();
initialLocation = mylocation;
/***********************************************************************/