$(document).ready(function () {
	//We create our canvas an assign it a class
	var canvas = Raphael("container", 500, 500);
	canvas.canvas.id = "fifth-exercise";
	//Here we change the coordinates of the canvas to the middle
	canvas.setViewBox(-250, -250, 500, 500);
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
	drawAxes();
	drawCartisianPlane();
	drawCircle();
	// updateCirclePos(mouseX, mouseY);
	//
	//
	//Listeners/Events
	//
	//
	$canvasHandler.mousemove(function (e) {
		// var newMousePosX = e.offsetX - 250;
		// var newMousePosY = e.offsetY - 250;
		// console.log("Mouse pos in X: " + newMousePosX + "Mouse pos in Y: " + newMousePosY);
	});
	$canvasHandler.on("click", function (e) {
		//We need an offset since the the whole coordinate system was moved to the center of the canvasx
		var newMousePosX = e.offsetX - 250;
		var newMousePosY = e.offsetY - 250;
		updateCirclePos(newMousePosX, newMousePosY);
		updateModelView();
		// console.log("I'm being clicked");
	});
	//
	//
	//Functions
	//
	//
	function drawCircle() {
		newCircle = canvas.circle(0, 0, 10).attr({
			fill: "blue",
			stroke: "2px"
		});
	}

	function drawCartisianPlane() {
		console.log(height_two);
		var line = canvas.path("M-250," + 0 + " L" + 250 + "," + 0).attr({
			"stroke-width": "2"
		});
		var line2 = canvas.path("M" + 0 + ",-250 L" + 0 + "," + 250).attr("stroke-width", "2");
	}
	//Use this as guides to see where the circle lands
	function drawAxes() {
		//This draws vertical lines
		for (var i = -10; i < 10; i++) {
			// var line = canvas.path(["M", (25 * i), 0, "L", (25 * i), 500]);
			var line = canvas.path("M" + (25 * i) + "," + -height_two + " L" + (25 * i) + "," + height_two);
		}
		//This draws horizontal lines
		for (var i = -10; i < 10; i++) {
			// var line = canvas.path(["M", (25 * i), 0, "L", (25 * i), 500]);
			var line2 = canvas.path("M" + -width_two + "," + (25 * i) + " L" + width_two + "," + (25 * i));
		}
	}
	updateCirclePos = function (posX, posY) {
		for (var i = -250; i <= 250; i += 25) {
			for (var j = -250; j <= 250; j += 25) {
				if (posX > i && posX < i + 25) {
					if (posY > j && posY < j + 25) {
						newCircle.node.cx.baseVal.value = i;
						newCircle.node.cy.baseVal.value = j;
						//Here we pass the values of the coordinate system in the visual model.
						//We multiply by -1 so that we can invert it
						circlePos[0] = (i / 25);
						circlePos[1] = (j / 25) * -1;
						// console.log("I'm being called");
					}
				}
			}
		}
	}
	updateModelView = function () {
		var $posXHandler = $(".posx");
		var $posYHandler = $(".posy");
		var posXHtmlString = "X = " + parseInt(circlePos[0]);
		var posYHtmlString = "Y = " + parseInt(circlePos[1]);
		$posXHandler.text(posXHtmlString);
		$posYHandler.text(posYHtmlString);
		console.log("I'm passing a string");
	}
	console.log(canvas);
});