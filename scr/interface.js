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
	sel = $.$.i(s);
	for (i = init; i <= end; i++) {
		var option = $.create('option');
		option.text = i.toString();
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