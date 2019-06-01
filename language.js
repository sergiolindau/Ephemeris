/***********************************************************************
 JavaScript Language Selection Engine
 
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

/***********************************************************************
 Language menu and translation engine
***********************************************************************/
var languageCodeArray = [];
var languageDescriptionArray = [];
for (i in languageTable) {
	languageCodeArray[languageCodeArray.length] = i;
	languageDescriptionArray[languageDescriptionArray.length] = languageTable[i];
}
var language_code_index = 0;
var language_code = languageCodeArray[language_code_index];
var language_code_change_handle = [translationHandle];
var select_prefix = [];
var table_postfix = "Table";

function setLanguageIndex(index) {
	language_code_index = index;
	language_code = languageCodeArray[language_code_index];
	for(i=0;i<language_code_change_handle.length;i++) language_code_change_handle[i](language_code);
	return language_code;
}

function getLanguage() {
	return language_code;
}

function setLanguage(code) {
	language_code = code
	return language_code;
}

function addLanguageChangeHandle(handle){
	if ((typeof handle) == "function")
		language_code_change_handle[language_code_change_handle.length] = handle;
}

function languageMenuChange(){
	language_code_index = document.getElementById("select_language_menu").selectedIndex;
	language_code = languageCodeArray[language_code_index];
	for(i=0;i<language_code_change_handle.length;i++) language_code_change_handle[i](language_code);
}

/***********************************************************************
 Function to write elements with translation
***********************************************************************/
function makeTranslation(container,attr,code,description_set) {
	var args = container.split("_");//
	container = document.getElementById(container);
	var ttype = args[0].toLowerCase();
	var element,temp, cclass;
	if (ttype=="translation") {
		cclass = document.createAttribute('class');
		cclass.value = args[1];
		container.setAttributeNode(cclass);
		container.innerHTML = translationTable[args[1]][language_code];
	}
	else if (ttype=="glossary") {
			element = document.createElement('a');
			element.setAttribute('class',args[1]);
			element.setAttribute('href',glossaryTable[args[1]][language_code][1]);
			element.setAttribute('target',"_blank");
			element.setAttribute('title',glossaryTable[args[1]][language_code][2]);
			element.innerHTML = glossaryTable[args[1]][language_code][0];
			container.innerHTML = "";
			container.appendChild(element);
	}
	else if (ttype=="select") {
		var prefix = args[1].toLowerCase();
		if (prefix=="language") {
			var language_select = document.createElement('select');
			language_select.setAttribute('id',"select_language_menu");
			container.innerHTML = "";
			container.appendChild(language_select);
			var option;
			for(var i=0;i<languageDescriptionArray.length;i++){
				option = document.createElement('option');
				option.innerHTML = languageDescriptionArray[i];
				language_select.add(option);
			}
			language_select.addEventListener('change',languageMenuChange);
		}
		else if (prefix=="timezone") {
		}
		else {
			if (!select_prefix.includes(prefix)) select_prefix.push(prefix);
			var test_id = args.length>2;
			var id = test_id?args[2]:"";
			var test_attr = arguments.length>1;
			var attr = test_attr?(" "+arguments[1]+" "):"";
			var test_code = arguments.length>2;
			var code = test_code?arguments[2]:language_code;
			var test_description_set = arguments.length>3;
			var description_set = test_code?arguments[3]:0;
			container.innerHTML = "<select class=\""+prefix+"Menu"+(test_code?("_"+code):"")+"\" "+
				(test_id?("id=\""+id+"\" "):"")+
				attr+
				"></select>";
			var select = document.getElementById(id);
			var option;
			var langTable = eval(prefix+table_postfix+"[code][description_set]");
			for(var i=0;i<langTable.length;i++){
				option = document.createElement('option');
				option.innerHTML = langTable[i];
				select.add(option);
			}
		}
	}
}

/***********************************************************************
 Translation Handle
***********************************************************************/
function translationHandle() {
	var elements,tab,i,j,k;
	for(i in translationTable) {
		try {
			elements = document.getElementsByClassName(i);
			for(j=0; j<elements.length; j++) {
				elements[j].innerHTML = translationTable[i][language_code];
			}
		}
		catch(err) {}
	}
	for(i in glossaryTable) {
		try {
			elements = document.getElementsByClassName(i);
			for(j=0; j<elements.length; j++) {
				elements[j].innerHTML = glossaryTable[i][language_code][0];
				elements[j].href = glossaryTable[i][language_code][1];
				elements[j].title = glossaryTable[i][language_code][2];
			}
		}
		catch(err) {}
	}
	for(k=0;k<select_prefix.length;k++){
		try {
			elements = document.getElementsByClassName(select_prefix[k]+"Menu");
			tab = eval(select_prefix[k]+"Table[language_code][0]");
			for(var i=0; i<elements.length; i++) {
				for(var j=0; j<tab.length; j++) {
					elements[i].options[j].text = tab[j];
				}
			}
		}
		catch(err) {}
	}
}