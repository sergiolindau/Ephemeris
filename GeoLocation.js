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

/***********************************************************************
 GeoLocation object (get geographic coordinates)
***********************************************************************/
GeoLocation = function() {
/***********************************************************************/
	var that = this;
	this.position = {lat:0,lng:0};
	this.status = 2;
/***********************************************************************/
	var coords2latLng = function(pos) {
		that.position = {lat: pos.coords.latitude, lng:pos.coords.longitude};
		that.status = 0;
		that.onset(that.position);
	}
/***********************************************************************/
	this.isLocationResponse = function() {
		return this.status?false:true;
	}
/***********************************************************************/
	this.isLocationResponseWaiting = function() {
		return (this.status==1)?true:false;
	}
/***********************************************************************/
	this.getPosition = function() {
		return this.position;
	}
/***********************************************************************/
	this.setPosition = function(pos) {
		this.position.lat = pos.lat;
		this.position.lng = pos.lng;
		this.status = 2;
	}
/***********************************************************************/
	this.getPositionAngle = function() {
		return {lat:new Angle(this.position.lat),lng:new Angle(this.position.lng)};
	}
/***********************************************************************/
	this.setPositionAngle = function(pos) {
		this.position.lat = pos.lat.dec;
		this.position.lng = pos.lng.dec;
		this.status = 2;
	}
/***********************************************************************/
	this.getLocation = function() {
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