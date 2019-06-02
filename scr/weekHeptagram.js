//https://www.w3schools.com/graphics/canvas_reference.asp
function drawWeekHeptagram(canvasID) {
	document.writeln("<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Weekday_heptagram.ant.png/220px-Weekday_heptagram.ant.png\" width=\"220\" height=\"220\" style=\"border:1px solid #000000;\" />");
	document.writeln("<canvas id=\"weekHeptagram\" width=\"220\" height=\"220\" style=\"border:1px solid #000000;\"></canvas>");
var c = document.getElementById(canvasID);
var ctx = c.getContext("2d");
var x0 = Math.floor(c.width/2);
var y0 = Math.floor(c.height/2);
var r = 0.75*x0;
var font_size = 25;

ctx.beginPath();
ctx.arc(x0, y0, r, 0, 2 * Math.PI);
ctx.stroke();

const heptagram_angle = [
	[ 7/14 * Math.PI, "☉"],
	[11/14 * Math.PI, "♂"],
	[15/14 * Math.PI, "♃"],
	[19/14 * Math.PI, "♄"],
	[23/14 * Math.PI, "☽"],
	[27/14 * Math.PI, "☿"],
	[31/14 * Math.PI, "♀"]
];
const heptagram_points = [0,3,6,2,5,1,4];

ctx.moveTo(r*Math.cos(heptagram_angle[0][0])+x0, -r*Math.sin(heptagram_angle[0][0])+y0);
	var from, to = 0;
for (i=1;i<=7;i++){
	from = to;
	to = heptagram_points[i%7];
	ctx.lineTo(r*Math.cos(heptagram_angle[to][0])+x0, -r*Math.sin(heptagram_angle[to][0])+y0);
	ctx.stroke();
}
ctx.font = font_size + "px Georgia";
for (i=0;i<7;i++){
	ctx.fillText(heptagram_angle[i][1], 1.2*r*Math.cos(heptagram_angle[i][0])+x0-font_size/2, -1.2*r*Math.sin(heptagram_angle[i][0])+y0+font_size/2);
}
}