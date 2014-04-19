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
	var sizerClass = $("circle.sizer");
	var justDragged = false;
	var circlePicker = $('#picker-circle');
	var codeElement = $('#code');
	var circlePickerSelector = false;
	//We use this array to store all the different circles that get drawn on the screen
	var circles = [];
	//This last two variables add sequential IDs to our circles
	var circleCounter = 1;
	var sizerCounter = 1;
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
	$('.sizer').click(function () {
		console.log("I'm being clicked");
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
	circle2.mouseover(function () {
		this.attr({
			fill: "red"
		});
	});
	//---------------------------------------------------------------------------//
	//-------------------------------- Functions --------------------------------//
	//---------------------------------------------------------------------------//
	function makeCircle(mouseX, mouseY) {
		//We call it before our circles are dragged so that their array is waiting to store the information
		// addingArrays(circleCounter);
		var radius;
		var fill;
		var circle = canvas.circle(mouseX, mouseY, 50).attr({
			fill: "hsb(.8, 1, 1)",
			stroke: "none",
			opacity: .5,
		});
		// console.log(circle);
		// We add an ID and a class to the circle
		var ourCircle = $("circle").last();
		ourCircle.attr({
			"id": circleCounter,
			"class": "main-circle"
		});
		var mainCircle = $('.main-circle');
		// And then finally push it to our array of circles
		circles.push(circle);
		//Passing mouseX,mouseY and the circle counter
		updateView();
		var handlerPos = [mouseX + 35, mouseY + 35];
		var s = canvas.circle(handlerPos[0], handlerPos[1], 10).attr({
			fill: "hsb(.8, .5, .5)",
			stroke: "none",
			opacity: .5
		});
		//We add an id and a class to our little circle.
		s.node.id = sizerCounter;
		var sizerClass = $('circle').last();
		sizerClass.attr("class", "sizer");
		var newSizerClass = $(".sizer");
		console.log(s);
		//We want our little sizer to be hidden, we will call everytime he hover oru main circle
		s.hide();
		//Everytime we hover on the main circle the sizer shows up
		mainCircle.mouseenter(function () {
			// console.log("I'm being mouseover");
			newSizerClass.toggle();
		});
		//When we leave our sizer disappears
		mainCircle.mouseleave(function () {
			newSizerClass.hide();
		});
		//Same for the sizer
		newSizerClass.mouseenter(function () {
			$(this).toggle();
		});
		newSizerClass.mouseleave(function () {
			$(this).hide();
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
				//This is the key function to change 
				updateModel(this.attrs.cx, this.attrs.cy, this.node.id, this.attrs.r);
				// if (xPositionsCircles.setOfXpos1.length == 5) {
				// 	xPositionsCircles.setOfXpos1.shift();
				// 	// console.log(xPositionsCircles.setOfXpos1);
				// }
				// for (var key in xPositionsCircles) {
				// 	var obj = xPositionsCircles[key];
				// 	for (var prop in obj) {
				// 		console.log(obj[3]);
				// 		obj[prop].push(this.attrs.cx);
				// 	}
				// 	// This is an alternative method using
				// 	for (var i = 0; i < obj.length; i++) {
				// 		// console.log(obj[i]);
				// 		obj[i]
				// 	}
				// }
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
				// updateModel(this.attrs.cx, this.attrs.cy, this.node.id, this.attrs.r);
			};
		circle.drag(move, start, up);
		circle.sizer = s;
		s.drag(rmove, rstart);
		s.big = circle;
		// console.log(circle);
		circleCounter++;
		sizerCounter++;
		//I could also return a circle if I wanted
		// return circle;
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
	// This is also called when updating the model. Something has changed, move
	// This gets called everytime the move function gets fired.
	function updateModel(x, y, id, r) {
		var len = circles.length;
		for (var i = 0; i < len; i++) {
			//We check if the circle that's gonna be moved exists through its class and the we
			if (circles[i].node.id == id) {
				circles[i].attrs.cx = x;
				circles[i].attrs.cy = y;
				circles[i].attrs.r = r;
			}
		}
		//myCircleArray[id].x = x;
		//myCircleArray[id].y = y;
		updateView();
	}
	//This is called whenever something changes within the array and renders the new values in the canvas
	function updateView() {
		$('#code').html(modelToString());
	}
	//We are looping through the circleArray and then we find the X and the Y position and id
	function modelToString() {
		// format as a UL
		var html = "<ul>";
		var len = circles.length;
		// var outputString = '';
		for (var i = 0; i < len; i++) {
			var item = circles[i];
			// html+="<li>Id is :"+item.id+"</li>"
			// outputString += "circle (" + item.attrs.cx + " ," + item.attrs.cy + ",radius); ";
			html += "<li> var radius = " + parseInt(item.attrs.r) + "; </li>" + "<li> circle (" + item.attrs.cx + " ," + item.attrs.cy + ", radius); </li>";
			// outputString += "\n";
		}
		html += "</ul> <br>";
		// return outputString;
		return html;
	}
	// setInterval((function (){ addCode(xPositionsCircles)}))
});