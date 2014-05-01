$(document).ready(function () {
	var canvas = Raphael("container", 500, 500);
	canvas.canvas.id = "second-exercise";
	var $canvasHandler = $("#second-exercise");
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
		//This draws horizontal lines
		for (var i = 1; i < 25; i++) {
			// var line = canvas.path(["M", (25 * i), 0, "L", (25 * i), 500]);
			var line = canvas.path("M" + (25 * i) + ",0" + " L" + (25 * i) + ",500");
		}
		//This draws vertical lines
		for (var i = 1; i < 25; i++) {
			// var line = canvas.path(["M", (25 * i), 0, "L", (25 * i), 500]);
			var line2 = canvas.path("M" + "0," + (25 * i) + " L" + "500," + (25 * i));
		}
	}
	$canvasHandler.mousemove(function (e) {
		console.log(e.clientX);
		// var circle = canvas.circle(e.offsetX, e.offsetY, 25).attr({
		// 	fill: "red",
		// 	stroke: "2px"
		// });
		drawCircle(e.offsetX, e.offsetY);
	})

	function drawCircle(posX, posY) {
		var circleSet = canvas.set();
		// if( circleSet.)
		console.log(circleSet.length);
		for (var i = 0; i < 500; i += 25) {
			for (var j = 0; j < 500; j += 25) {
				if (posX > i && posX < i + 25) {
					if (posY > j && posY < j + 25) {
						circleSet.push(canvas.circle(i + 12.5, j + 12.5, 12.5));
					}
				}
			}
		}
	}
});