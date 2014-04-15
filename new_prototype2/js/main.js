$(document).ready(function () {
	//---------------------------------------------------------------------------//
	//-----------------------------General Variables-----------------------------//
	//---------------------------------------------------------------------------//
	//We create our canvas and add an ID
	var canvas = Raphael("container", 500, 500);
	var circleSet = canvas.set();
	var ourCanvas = $('svg').last();
	ourCanvas.attr("id", "canvas");
	var canvasHandler = $("#canvas");
	//We create a div with a class to append our canvas
	var containerHandler = $("#container");
	var circleClass = $("circle.quincy");
	var justDragged = false;
	var circlePicker = $('#picker-circle');
	var codeElement = $('#code');
	var circlePickerSelector = false;
	var circles = [];
	var circleCounter = 1;
	//We will store the arrays for the position in the object
	var xPositionsCircles = {
		// nestedArray: [4, 5, 6],
		// nestedArray2: [6, 6, 7]
	};
	// console.log(myArray.nestedArray[1]);
	//---------------------------------------------------------------------------//
	//------------------------------Event Listeners------------------------------//
	//---------------------------------------------------------------------------//
	canvasHandler.mouseup(function (e) {
		// console.log(e);
		// var mouseX = e.pageX - findPos(this)[0];
		// var mouseY = e.pageY - findPos(this)[1];
		var mouseX = e.offsetX;
		var mouseY = e.offsetY;
		if (circlePickerSelector) {
			makeCircle(mouseX, mouseY);
			circlePickerSelector = false;
		}
		findPos(this);
		// console.log("This is the position of the mouse in X: " + e.pageX);
		// console.log("This is the position of the mouse in Y: " + e.pageY);
		// console.log(circles);
		// //Use this function to check if the id have been added to the circles
		// for (var i = 0; i < circles.length; i++) {
		// 	console.log(circles[i][0]['id']);
		// }
	});
	// This is for my picker
	circlePicker.click(function () {
		circlePickerSelector = !circlePickerSelector;
		// booleanChecker(circlePickerSelector);
		// console.log(circlePickerSelector);
	});
	//This is a test
	var circle2 = canvas.circle(canvasHandler.width() / 2, canvasHandler.height() / 2, 50).attr({
		fill: "blue",
		stroke: "none",
		opacity: .5,
		id: "circle2"
	});
	var ourCircle = $("circle").last();
	ourCircle.attr("id", "mauricio");
	circle2.mouseover(function (event) {
		this.attr({
			fill: "red"
		});
	});
	//---------------------------------------------------------------------------//
	//-------------------------------- Functions --------------------------------//
	//---------------------------------------------------------------------------//
	function makeCircle(mouseX, mouseY) {
		//We call it before our circles are dragged so that their array is waiting to store the information
		addingArrays(circleCounter);
		var radius;
		var fill;
		var thisCirclesID = String(new Date().getTime());
		var circle = canvas.circle(mouseX, mouseY, 50).attr({
			fill: "hsb(.8, 1, 1)",
			stroke: "none",
			opacity: .5,
		});
		// We add an id to the circle
		var ourCircle = $("circle").last();
		ourCircle.attr("id", circleCounter);
		var handlerPos = [mouseX + 50, mouseY + 50];
		var s = canvas.circle(handlerPos[0], handlerPos[1], 10).attr({
			fill: "hsb(.8, .5, .5)",
			stroke: "none",
			opacity: .5
		});
		//We add some resizing and dragging properties
		var start = function () {
			//storing original coordinates
			this.ox = this.attr("cx");
			this.oy = this.attr("cy");
			this.sizer.ox = this.sizer.attr("cx");
			this.sizer.oy = this.sizer.attr("cy")
			this.attr({
				opacity: 1
			});
			this.sizer.attr({
				opacity: 1
			});
		},
			move = function (dx, dy) {
				// move will be called with dx and dy
				this.attr({
					cx: this.ox + dx,
					cy: this.oy + dy
				});
				this.sizer.attr({
					cx: this.sizer.ox + dx,
					cy: this.sizer.oy + dy
				});
				codeElement.html(['circle(' + this.attrs.cx + ',' + this.attrs.cx + ', radius);']);
				// posXDragged.push(this.attrs.cx);
				xPositionsCircles.setOfXpos1.push(this.attrs.cx);
				if (xPositionsCircles.setOfXpos1.length == 5) {
					xPositionsCircles.setOfXpos1.shift();
				}
				console.log(xPositionsCircles.setOfXpos1);
			},
			up = function () {
				// restoring state
				this.attr({
					opacity: .5
				});
				this.sizer.attr({
					opacity: .5
				});
			},
			rstart = function () {
				// storing original coordinates
				this.ox = this.attr("cx");
				this.oy = this.attr("cy");
				this.big.or = this.big.attr("r");
			},
			posx = function () {},
			rmove = function (dx, dy) {
				// move will be called with dx and dy
				this.attr({
					cx: this.ox + dy,
					cy: this.oy + dy
				});
				this.big.attr({
					r: this.big.or + (dy < 0 ? -1 : 1) * Math.sqrt(2 * dy * dy)
				});
			};
		circle.drag(move, start, up);
		circle.sizer = s;
		s.drag(rmove, rstart);
		s.big = circle;
		// And then finally push it to our array
		circles.push(circle);
		circleSet.push(circle);
		//This writes the code of every circle in the canvas
		addCode(mouseY, mouseY);
		if (circleCounter == 1) {
			xPositionsCircles.setOfXpos1.push(8);
			console.log(xPositionsCircles.setOfXpos1[0]);
		} else {
			console.log("doesn't exist yet");
		}
		console.log(xPositionsCircles.setOfXpos1);
		circleCounter++;
		// console.log(circles);
		// console.log(move);
		// console.log(circleSet);
		// console.log(circleCounter);
	}

	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj == obj.offsetParent);
			// console.log(curleft);
			// console.log(curtop);
			// return [curleft, curtop];
		}
		return [curleft, curtop];
	}
	//This function takes into consideration the offset of the new position on X from the canvas
	function realXPos(obj) {
		var curLeft = 0;
		if (obj.offsetParent) {
			do {
				curLeft += obj.offsetLeft;
			} while (obj == obj.offsetParent);
		}
		return curLeft;
	}

	function realYPos(obj) {
		var curTop = 0;
		if (obj.offsetParent) {
			do {
				curTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return curTop;
	}
	// function booleanChecker(isThisTrue) {
	// 	// circlePickerSelector = !circlePickerSelector;
	// 	// return circlePickerSelector;
	// 	if (isThisTrue == false) {
	// 		isThisTrue = true;
	// 		console.log("I turned into true");
	// 	} else if (isThisTrue == true) {
	// 		isThisTrue = false;
	// 		console.log("I turned into false");
	// 	}
	// 	return isThisTrue;
	// }
	function bool(initial) {
		initial = !! initial;
		return {
			get current() {
				return initial;
			},
			toggle: function () {
				return initial = !initial;
			}
		};
	}
	//Everytime that we add a circle we ut put the code that we use. This appends the code for that
	function addCode(cirX, cirY) {
		var codeSelector = document.getElementById('code');
		var newLineOfCode = document.createElement('code');
		newLineOfCode.innerHTML = 'circle(' + cirX + ',' + cirY + ', radius) </br>';
		codeSelector.appendChild(newLineOfCode);
	}
	//Here we add arrays to our object. the idea is to store the position of the circles when dragged
	function addingArrays(counter) {
		for (var i = 1; i <= counter; i++) {
			xPositionsCircles["setOfXpos" + i] = [];
			console.log(xPositionsCircles);
			// console.log(xPositionCircles.set)
			// if (xPositionsCircles["setOfXpos" + i].length == 5) {
			// 	xPositionCircles["setOfXpos" + i].shift();
			// }
		}
	}
});