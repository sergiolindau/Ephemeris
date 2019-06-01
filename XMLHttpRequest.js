/***********************************************************************
 JavaScript AjaxRequest
 
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
//https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHTTPRequest
//https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest/Usando_XMLHttpRequest
//https://www.w3schools.com/js/js_ajax_http.asp
class AjaxRequest {
	constructor() {
		if(window.XMLHttpRequest)
		{
			try
			{
				this.request = new XMLHttpRequest();
			}
			catch(e)
			{
				throw new Error(e);
			}
		}
		else
		{
			if(window.ActiveXObject)
			{
				try
				{
					this.request = new ActiveXObject("Xsxml2.XMLHTTP");
				}
				catch(e1)
				{
					try
					{
						this.request = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch(e2)
					{
						throw new Error(e1+"\n"+e2);
					}
				}
			}
			else
			{
				if(window.createRequest)
				{
					try
					{
						this.request = window.createRequest();
					}
					catch(e)
					{
						throw new Error(e);
					}
				}
			}
		}

	/*
	 * If we didn't succeed in making the request object, alert
	 * the caller of the problem.
	 */
		if(!this.request)
		{
			throw new Error("Couldn't create an XMLHttpRequest\n");
		}
	}
	abort(){
		this.request.abort();
	}
	getAllResponseHeaders(){
		this.request.getAllResponseHeaders();
	}
	overrideMimeType(mime){
		this.request.overrideMimeType(mime);
	}
	setRequestHeader(header, value){
		this.request.setRequestHeader(header, value);
	}
}

function JSONasyncRequest(url) {
	var that = this;
	var is_finished = false;
	var status = 0;
	var HttpReq = new AjaxRequest();
	this.result = {};
	this.url = (url)?url:"";
	this.onfinished = function(req,parent){};
	this.isfinished = function(){
		return is_finished;
	};
	this.status = function(){
		return status;
	};
	HttpReq.request.onreadystatechange = function() {
		if(this.readyState!==this.DONE)	{
			return;
		}
		else {
			is_finished = true;
		}
		status = this.status
		if(this.status==200) {
			try
			{
				that.result = JSON.parse(this.responseText);
				that.onfinished(this,that);
			}
			catch(e)
			{
				throw new Error(e);
				return;
			}
		}
	};
	this.get = function(){
		HttpReq.request.open("GET", this.url, true);
		HttpReq.request.send();
	}
}