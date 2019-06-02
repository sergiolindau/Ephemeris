/***********************************************************************
 JavaScript Timezone Database Ajax Engine
 
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

//http://tzdata-javascript.org/
//https://www.iana.org/time-zones
//https://tools.ietf.org/html/rfc6557
//https://tools.ietf.org/html/rfc5545
//https://data.iana.org/time-zones/tz-link.html
//https://tools.ietf.org/html/rfc7265
function TimeZone(url,ongetlist,ongetzone,zone1,zone2 /* , ... */)
{
	var that = this;
	this.baseURL = "https://zoneinfo-ssl.tzdata-javascript.org/zoneinfo/";
	this.zonelist = [];
	this.zoneindex = 0;
	this.listLoaded = false;
	this.timezones = {};
	this.timezone = "America/Sao_Paulo";

	this.UNSET = 0;
	this.DONE = 1;
	this.readyState = this.UNSET;

	if ((arguments.length>0) && (url!=null) && (url!=undefined) && (url.trim()!="")) {
		this.baseURL = url;
	}
	
	if ((arguments.length>1)) {
		this.ongetlist = arguments[1];
	}
	else {
		this.ongetlist = function(tz){}
	}

	var zonelist = new JSONasyncRequest();
	var zoneinfo = new JSONasyncRequest();

	this.getzonelist = function() {
		this.zonelist = [];
		this.timezones = {};
		this.readyState = this.UNSET;
		this.listLoaded = false;
		zonelist.url = this.baseURL+".timezones";
		zonelist.onfinished = function(req,paren){
			for(var i in paren.result){
				that.zonelist.push(i);
			}
			that.zonelist.sort();
			that.zoneindex = that.zonelist.indexOf(that.timezone);
			that.readyState = this.DONE;
			that.listLoaded = true;
			that.ongetlist(that);
			that.getzoneinfo(that.timezone);
		};
		zonelist.get();
	};

	if ((arguments.length>2)) {
		this.ongetzone = arguments[2];
	}
	else {
		this.ongetzone = function(tz){}
	}
	
	this.getzoneinfo = function(zone) {
		if (!(zone in this.timezones)) {
			this.readyState = this.UNSET;
			zoneinfo.url = this.baseURL+zone;
			zoneinfo.onfinished = function(req,paren){
				that.timezones[zone] = paren.result;
				that.readyState = this.DONE;
				that.ongetzone(that);
			};
			zoneinfo.get();
		} 
	};

	this.settimezone = function(zone) {
		if (arguments.length>0) {
			if (typeof(zone)=="number") {
				this.zoneindex = zone;
				zone = this.zonelist[zone];
			}
		}
		else {
			zone = this.timezone;
		}
		if (!(zone in this.timezones)) {
			zoneinfo.url = this.baseURL+zone;
			zoneinfo.onfinished = function(req,paren){
				that.timezones[zone] = paren.result;
				that.timezone = zone;
				if (that.listLoaded) that.zoneindex = that.zonelist.indexOf(that.timezone);
				that.readyState = this.DONE;
				that.ongetzone(that);
			};
			zoneinfo.get();
		} 
	}
	
	for (var i=3;i<arguments.length;i++) {
		this.getzoneinfo(arguments[i]);
	}

}