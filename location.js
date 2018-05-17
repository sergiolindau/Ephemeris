/*
 Geolocation Extension for Javascript

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

/***********************************************************************/
GeoLocation = function() {
/***********************************************************************/
	var that = this;
/***********************************************************************/
	var coords2latLng = function(pos) {
		that.position = {lat: pos.coords.latitude, lng:pos.coords.longitude};
		that.status = 0;
		that.onset(that.position);
	}
/***********************************************************************/
	this.position = {lat:0,lng:0};
/***********************************************************************/
	this.status = 2;
/***********************************************************************/
	this.getLocation = function (){
		switch (this.status) {
			case 2:
			    if (navigator.geolocation) {
    		    	navigator.geolocation.getCurrentPosition(coords2latLng);
	    		} else { 
	    	    	throw "Geolocation is not supported by this browser.";
			    }
				this.status = 1;
				break;
			case 1,0:
				break;
		}
		return this.status;
	};
/***********************************************************************/
	this.reset = function() {
		this.position = {lat:0,lng:0};
		this.status = 2;
	}
/***********************************************************************/
	this.onset = function(position){alert("GeoLocation.onset({ lat:"+position.lat+", lng:"+position.lng+"})")};
/***********************************************************************/
};
/***********************************************************************/

/***********************************************************************/
function degreeToDecimal(d,m,s,l) {
		return (( l == -1 || l.toUpperCase()=="S" || l.toUpperCase()=="L" || l.toUpperCase()=="E")?-1:1)*(d+(m*60+s)/3600.0);
	}
/***********************************************************************/
function decimalToDegree(d) {
		return {deg:~~d, min:~~((d-~~d)*60), sec:Math.round(((d-~~d)-(~~((d-~~d)*60))/60)*3600.0,10)};
	}
/***********************************************************************/
function decimalToDegreeString(d) {
		return decimalToDegree(d).deg+"º "+Math.abs(decimalToDegree(d).min)+"' "+Math.abs(decimalToDegree(d).sec)+"''";
	}
/***********************************************************************/
function degreeToLatLng(latd,latm,lats,latl,lngd,lngm,lngs,lngl) {
	return {lat: degreeToDecimal(latd,latm,lats,latl), lng:degreeToDecimal(lngd,lngm,lngs,lngl)};
}
/***********************************************************************/
function getLatLngByDegree(latd,latm,lats,latl,lngd,lngm,lngs,lngl) {
	return {lat: degreeToDecimal(latd,latm,lats,latl), lng: degreeToDecimal(lngd,lngm,lngs,lngl)};
}
/***********************************************************************/
function degreeMinSecToDecimal(d) {
	return d[0]*(d[1]+(d[2]*60+d[3])/3600.0);
}
/***********************************************************************/
function decimalToDegreeMinSec(d) {
	var s = Math.sign(d); d = Math.abs(d); return [s, ~~d, ~~((d-~~d)*60), Math.round(((d-~~d)-(~~((d-~~d)*60))/60)*3600.0,10)];
}
/***********************************************************************/
function decimalToDegreeMinSecString(d) {
	return (d[0]*d[1])+"º "+d[2]+"' "+d[3]+"''";
}
/***********************************************************************/
