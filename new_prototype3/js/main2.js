$(document).ready(function (e) {
	var canvas = Raphael("container", 500, 500);
	canvas.canvas.id = "second-exercise";
	var $canvasHandler = $("#second-exercise");
	//This is our circle
	var newCircle;
	var circlePos = [];
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
	drawCircle();
	console.log(newCircle);

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
		// console.log(e.clientX);
		// var circle = canvas.circle(e.offsetX, e.offsetY, 25).attr({
		// 	fill: "red",
		// 	stroke: "2px"
		// });
		// console.log(e);
		updateCirclePos(e.offsetX, e.offsetY);
		updatingPosition();
	})

	function drawCircle() {
		newCircle = canvas.circle(12.5, 12.5, 10).attr({
			fill: "blue",
			stroke: "2px",
			opacity: .8
		});
	}

	function updateCirclePos(posX, posY) {
		for (var i = 1; i <= 500; i += 25) {
			for (var j = 1; j <= 500; j += 25) {
				if (posX > i && posX < i + 25) {
					if (posY > j && posY < j + 25) {
						newCircle.node.cx.baseVal.value = i + 12.5;
						newCircle.node.cy.baseVal.value = j + 12.5;
						circlePos[0] = (i / 25) + 1;
						circlePos[1] = (j / 25) + 1;
					}
				}
			}
		}
	}
	var updatingPosition = function () {
		//This is where the position in the canvas will be storing our
		var $posXHandler = $('.posx');
		var $posYHandler = $('.posy');
		var posXHtmlString = 'position x = ' + parseInt(circlePos[0]);
		var posYHtmlString = 'postion y = ' + parseInt(circlePos[1]);
		$posXHandler.text(posXHtmlString);
		$posYHandler.text(posYHtmlString);
	}
});