/*
 Canvas Graph for Javascript

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

//https://instructobit.com/tutorial/90/Creating-line-graphs-with-Javascript-using-an-HTML-canvas

var CanvasGraph = function(parent,id,width,height) {
	this.parent = parent;
	this.id = id;
	var Canvas = document.createElement("canvas");
	Canvas.setAttribute("id", id);
	var node = document.createTextNode("Error: this.canvas not supported.");
	Canvas.appendChild(node);
	if (arguments.length>2) {
		Canvas.setAttribute("width", width);
	}
	if (arguments.length>3) {
		Canvas.setAttribute("height", height);
	}
	var element = document.getElementById(parent);
	element.appendChild(Canvas);
	var Ctx = null;
	var Width = Canvas.width;
	var Height = Canvas.height;

	this.setWidth = function(w){
		Canvas.setAttribute("width", w);
		Width = w;
	}

	this.setHeight = function(h){
		Canvas.setAttribute("height", h);
		Width = h;
	}
/* The origin (0,0) of the canvas is the upper left:

  (0,0)
    --------- +X
   |
   |
   |
   |
   +Y

  Positive x coordinates go to the right, and positive y coordinates go down.

  The origin in mathematics is the "center," and positive y goes *up*.

  We'll refer to the mathematics coordinate system as the "logical"
  coordinate system, and the coordinate system for the canvas as the
  "physical" coordinate system.

  The functions just below set up a mapping between the two coordinate
  systems.

  They're defined as functions, so that one wanted to, they could read
  ther values from a from instead of having them hard-coded. */

	// The right boundary of the logical viewport:
	var MaxX = 10;
	this.setMaxX = function(x) {
		MaxX = x;
		setXSTEP();
		this.setIntervalY();
	}
	this.getMaxX = function() {
		return MaxX;
	}

	// Returns the left boundary of the logical viewport:
	var MinX = -10;
	this.setMinX = function(x) {
		MinX = x;
		setXSTEP();
		this.setIntervalY();
	}
	this.getMinX = function() {
		return MinX;
	}

	this.setIntervalX = function(x1,x2) {
		MinX = x1;
		MaxX = x2;
		setXSTEP();
		this.setIntervalY();
	}

	this.getIntervalX = function() {
		return [MinX, MaxX];
	}

	var Func = "var dfunc = function(x) {return Math.sin(x);};";
	// When rendering, XSTEP determines the horizontal distance between points:
	var XSTEP;
	function setXSTEP() {
		XSTEP = (MaxX-MinX)/Width;
	}
	setXSTEP();
	
	var MinY = 0;
	var MaxY = 0;

	this.setIntervalY = function() {
		MinY = 0;
		MaxY = 0;
		eval(Func);
		for (var x = MinX; x <= MaxX; x += XSTEP) {
			MinY = Math.min(MinY,dfunc(x));
			MaxY = Math.max(MaxY,dfunc(x));
		}
		MinY *= 1.15;
		MaxY *= 1.15;
	}

	// Returns the physical x-coordinate of a logical x-coordinate:
	function XC(x) {
		return (x - MinX) / (MaxX - MinX) * Width;
	}

	// Returns the physical y-coordinate of a logical y-coordinate:
	function YC(y) {
		return Height - (y - MinY) / (MaxY - MinY) * Height;
	}
	/* Rendering functions */

	this.setFunction = function(f,a){
		Func = "var dfunc = function("+a+") {return "+f+";};";
		this.setIntervalY();
	}
	// Clears the canvas, draws the axes and graphs the function F.
	this.draw = function() {

		// Evaluate the user-supplied code, which must bind a value to F.
		eval(Func);
		if (Canvas.getContext) {
			// Set up the canvas:
			Ctx = Canvas.getContext('2d');
			Ctx.clearRect(0,0,Width,Height);

			// Draw:
			DrawAxes();
			RenderFunction(dfunc);
  
		} else {
		    // Do nothing.
		}
	};

	// Returns the distance between ticks on the X axis:
	function XTickDelta() {
		return 1;
	}

	// Returns the distance between ticks on the Y axis:
	function YTickDelta() {
		return 1;
	}

	// DrawAxes draws the X ad Y axes, with tick marks.
	function DrawAxes() {
		Ctx.save();
		Ctx.lineWidth = 2;
		// +Y axis
		Ctx.beginPath();
		Ctx.moveTo(XC(0),YC(0));
		Ctx.lineTo(XC(0),YC(MaxY));
		Ctx.stroke();

		// -Y axis
		Ctx.beginPath();
		Ctx.moveTo(XC(0),YC(0));
		Ctx.lineTo(XC(0),YC(MinY));
		Ctx.stroke();

		// Y axis tick marks
		var delta = YTickDelta();
		for (var i = 1; (i * delta) < MaxY; ++i) {
			Ctx.beginPath();
			Ctx.moveTo(XC(0) - 5,YC(i * delta));
			Ctx.lineTo(XC(0) + 5,YC(i * delta));
			Ctx.stroke();  
		}

		var delta = YTickDelta();
		for (var i = 1; (i * delta) > MinY; --i) {
			Ctx.beginPath();
			Ctx.moveTo(XC(0) - 5,YC(i * delta));
			Ctx.lineTo(XC(0) + 5,YC(i * delta));
			Ctx.stroke();  
		}  

		// +X axis
		Ctx.beginPath();
		Ctx.moveTo(XC(0),YC(0));
		Ctx.lineTo(XC(MaxX),YC(0));
		Ctx.stroke();

		// -X axis
		Ctx.beginPath();
		Ctx.moveTo(XC(0),YC(0));
		Ctx.lineTo(XC(MinX),YC(0));
		Ctx.stroke();

		// X tick marks
		var delta = XTickDelta();
		for (var i = 1; (i * delta) < MaxX; ++i) {
			Ctx.beginPath();
			Ctx.moveTo(XC(i * delta),YC(0)-5);
			Ctx.lineTo(XC(i * delta),YC(0)+5);
			Ctx.stroke();  
		}

		var delta = XTickDelta();
		for (var i = 1; (i * delta) > MinX; --i) {
			Ctx.beginPath();
			Ctx.moveTo(XC(i * delta),YC(0)-5);
			Ctx.lineTo(XC(i * delta),YC(0)+5);
			Ctx.stroke();  
		}
		Ctx.restore();
	}

	// RenderFunction(f) renders the input funtion f on the canvas.
	function RenderFunction(f) {
		var first = true;

		Ctx.beginPath();
		for (var x = MinX; x <= MaxX; x += XSTEP) {
			var y = f(x);
			if (first) {
				Ctx.moveTo(XC(x),YC(y));
				first = false;
			}
			else {
				Ctx.lineTo(XC(x),YC(y));
			}
		}
		Ctx.stroke();
	}

};
