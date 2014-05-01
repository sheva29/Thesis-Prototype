$(document).ready(function () {
	var canvas = Raphael("container", 500, 500);
	canvas.canvas.id = "second-exercise";
	// var line = canvas.path(["M", 0, 25, "L", 500, 25]);
	// var circle = canvas.circle(250, 250, 50).attr({
	// 	fill: "#f0f0f0",
	// 	stroke: "none",
	// 	opacity: .5,
	// });
	// console.log(canvas.canvas.id);
	// drawVerticalLines(); 
	// console.log(drawVerticalLines);
	drawLines();

	function drawLines() {
		for (var i = 1; i < 25; i++) {
			// var line = canvas.path(["M", (25 * i), 0, "L", (25 * i), 500]);
			var line = canvas.path("M" + (25 * i) + ",0" + " L" + (25 * i) + ",500");
		}
		for (var i = 1; i < 25; i++) {
			// var line = canvas.path(["M", (25 * i), 0, "L", (25 * i), 500]);
			var line2 = canvas.path("M" + "0," + (25 * i) + " L" + "500," + (25 * i));
		}
	}
});