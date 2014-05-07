$(document).ready(function () {
	//We create our canvas an assign it a class
	var canvas = Raphael("container", 500, 500);
	canvas.canvas.id = "fifth-exercise";
	//we create our handler
	var $canvasHandler = $("#fifth-exercise");
	//This is our circle
	var newCircle;
	//We store the X and Y position on this array
	var circlePos = [];
	//
	//
	//Some general variables
	//
	//
	var width = canvas.width;
	var height = canvas.height;
	var width_two = canvas.width / 2;
	var height_two = canvas.height / 2;
	drawLines();
	drawCartisianPlane();
	drawCircle();
	// updateCirclePos(mouseX, mouseY);
	//
	//
	//Listeners/Events
	//
	//
	$canvasHandler.on("click", function (e) {
		updateCirclePos(e.offsetX, e.offsetY);
		console.log("I'm being clicked");
	});
	//
	//
	//Functions
	//
	//
	function drawCircle() {
		newCircle = canvas.circle(width_two, height_two, 10).attr({
			fill: "blue",
			stroke: "2px"
		});
	}

	function drawCartisianPlane() {
		console.log(height_two);
		var line = canvas.path("M0," + height_two + " L" + width + "," + height_two);
		var line2 = canvas.path("M" + width_two + ",0 L" + width_two + "," + height);
	}
	//Use this as guides to see where the circle lands
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
	updateCirclePos = function (posX, posY) {
		for (var i = 1; i <= 500; i += 25) {
			for (var j = 1; j <= 500; j += 25) {
				if (posX > i && posX < i + 25) {
					if (posY > j && posY < j + 25) {
						newCircle.node.cx.baseVal.value = i;
						newCircle.node.cy.baseVal.value = j;
						circlePos[0] = i + 1;
						circlePos[1] = j + 1;
						console.log("I'm being called");
					}
				}
			}
		}
	}
	console.log(canvas);
});