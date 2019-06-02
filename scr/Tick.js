/*
 Time Tick for Javascript

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

function Tick(run_action, start_action, stop_action) {
	var tick_handle;
	var is_running = false;
	var interval = 250;
	this.runAction = function(){console.log("executou default Tick.runAction()")};
	this.startAction = function(){console.log("executou default Tick.startAction()")};
	this.stopAction = function(){console.log("executou default Tick.stopAction()")};
	this.run = function() {
		if (!is_running) {
			tick_handle = setInterval(Tick.runAction, interval);
			is_running = true;
			Tick.startAction();
		}
	}
	this.stop = function() {
		if (is_running) {
			clearInterval(tick_handle);
			is_running = false;
			Tick.stopAction();
		}
	}
	this.runStop = function() {
		if (is_running) {
			clearInterval(tick_handle);
			is_running = false;
			Tick.stopAction();
		}
		else {
			tick_handle = setInterval(Tick.runAction, interval);
			is_running = true;
			Tick.startAction();
		}
	}
	if (arguments.length>0) {
		Tick.runAction = run_action;
		if (arguments.length>1){
			Tick.startAction = start_action;
			if (arguments.length>2){
				Tick.stopAction = stop_action;
			}
		}
	}
	this.setInterval = function(i) {
		if (is_running) {
			clearInterval(tick_handle);
			interval = i;
			tick_handle = setInterval(Tick.runAction, interval);
		}
		else {
			interval = i;
		}
	}
	this.isRunning = function() {
		return is_running;
	}
}