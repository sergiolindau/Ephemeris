class MITLicense {
	static TEXT = 0;
	static HTML = 1;
	static src = "https://opensource.org/licenses/MIT";
	static template(year,holders,format){
		var prefix_license = "";
		var copyright_sign = "(c)";
		var break_line = "\n";
		var start_paragraph = "";
		var break_paragraph = "\n\n";
		var postfix_license = "";
		if (arguments.length>2) {
			if (format==MITLicense.HTML) {
				prefix_license = "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/License_icon-mit-88x31-2.svg/88px-License_icon-mit-88x31-2.svg.png\" width=\"88\" height=\"31\" />";
				copyright_sign = "&copy;";
				break_line = " ";
				start_paragraph = "<p>";
				break_paragraph = "</p>";
				postfix_license = "";
			}
		}
		return prefix_license + start_paragraph + "Copyright  "+ copyright_sign + " " + year + " " + holders + break_paragraph +

start_paragraph + "Permission is hereby granted, free of charge, to any person obtaining a copy" + break_line +
"of this software and associated documentation files (the \"Software\"), to deal" + break_line +
"in the Software without restriction, including without limitation the rights" + break_line +
"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell" + break_line +
"copies of the Software, and to permit persons to whom the Software is" + break_line +
"furnished to do so, subject to the following conditions:" + break_paragraph +

start_paragraph + "The above copyright notice and this permission notice shall be included in" + break_line +
"all copies or substantial portions of the Software." + break_paragraph +

start_paragraph + "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR" + break_line +
"IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY," + break_line +
"FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE" + break_line +
"AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER" + break_line +
"LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM," + break_line +
"OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN" + break_line +
"THE SOFTWARE." + break_paragraph;

	}
}

