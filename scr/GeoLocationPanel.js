/***********************************************************************
 JavaScript Location Panel
 
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
var mylocation = {lat: new Angle(0),lng: new Angle(0)};
var TheLocation = new GeoLocation();
/***********************************************************************/
function updateCoordSelect(axis) {
	$.$.i(axis+"deg").selectedIndex = mylocation[axis].get(Angle.DEG);
	$.$.i(axis+"min").selectedIndex = mylocation[axis].get(Angle.MIN);
	$.$.i(axis+"sec").selectedIndex = mylocation[axis].get(Angle.SEC);
	$.$.i(axis+"dir").selectedIndex = mylocation[axis].get(Angle.DIR);
}
/***********************************************************************/
function updateLocationPanel() {
	$.$.i("isLocationResponse").checked  = TheLocation.isLocationResponse();
	$.$.i("isLocationResponseWaiting").checked  = TheLocation.isLocationResponseWaiting();
}
/***********************************************************************/
TheLocation.onset = function(pos){ 
	mylocation.lat.dec = pos.lat;
	mylocation.lng.dec = pos.lng;
	
	updateCoordSelect("lat");
	updateCoordSelect("lng");

	GeographicLatitude = $.$.i("latdec").value = mylocation.lat.get(Angle.DEC);
	GeographicLongitude = $.$.i("lngdec").value = mylocation.lng.get(Angle.DEC);

};
/***********************************************************************/
function clickGetLocation(){
	TheLocation.setPosition({lat:0,lng:0});
	TheLocation.getLocation();
}
/***********************************************************************/
function changeCoordElement(axis,field) {
	if (field=="dec"){
		mylocation[axis].set(Angle.DEC, parseFloat($.$.i(axis+field).value));
		updateCoordSelect(axis);
	}
	else {
		mylocation[axis].set(eval("Angle."+field.toUpperCase()), $.$.i(axis+field).selectedIndex);
		$.$.i(axis+"dec").value = mylocation[axis].get(Angle.DEC);
	}
	TheLocation.setPositionAngle(mylocation);
}
/***********************************************************************/
function initLocationPanel() {
	fillSelectNumber("latdeg",0,90);
	fillSelectNumber("latmin",0,59);
	fillSelectNumber("latsec",0,59);
	fillSelectNumber("lngdeg",0,180);
	fillSelectNumber("lngmin",0,59);
	fillSelectNumber("lngsec",0,59);
}
