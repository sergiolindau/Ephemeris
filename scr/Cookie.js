/***********************************************************************
 Useful cookies static functions for Javascript
 
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


/***********************************************************************
 An adaptation of cookies routines from Don Cross  http://cosinekitty.com
 Original version of these functions came from:
         http://www.quirksmode.org/js/cookies.html
 Don Cross modified these to escape/unescape value strings automatically.
************************************************************************/
var COOKIE_EXPIRATION_DAYS = 3650;

class Cookie {

/***********************************************************************/
	static write(name, value, days) 
	{
		var expires;
		if (days)
		{
			var date = new Date();
			date.setTime(date.getTime()+(days*864e5));
			expires = "; expires="+date.toGMTString();
		}
		else expires = "";
		document.cookie = name + "=" + escape(value) + expires + "; path=/";
	}
/***********************************************************************/
	static read(name, valueIfAbsent) 
	{
		var ca = document.cookie.split(/;\s*/);
		for (var i in ca)
		{
			var pair = ca[i].split(/=/);
			if (pair[0] == name) return unescape(pair[1]);
		}
		return valueIfAbsent;
	}
/***********************************************************************/
	static erase(name) 
	{
		Cookie.write(name,"",-1);
	}
/***********************************************************************/
	static getNameList()
	{
		var list = document.cookie.split (/=[^;]*;?\s*/);
		if (list[list.length-1] == "") --list.length;
		return list;
	} 
/***********************************************************************/
}