$(document).ready(function () {
	//
	//
	//
	//
	//---------------------------------------------------------------------------//
	//-----------------------------General Variables-----------------------------//
	//---------------------------------------------------------------------------//
	//
	//
	//
	//
	//We create our canvas and add an ID
	var canvas = Raphael("container", 500, 500);
	var circleSet = canvas.set();
	var ourCanvas = $('svg').last();
	ourCanvas.attr("id", "canvas");
	var canvasHandler = $("#canvas");
	//We create a div with a class to append our canvas
	var containerHandler = $("#container");
	var sizerClass = $("circle.sizer");
	var circlePicker = $('#picker-circle');
	var codeElement = $('#code');
	var circlePickerSelector = false;
	//We use this array to store all the different circles that get drawn on the screen
	var circles = [];
	//This is to assign color to the circle
	//This last two variables add sequential IDs to our circles
	var circleCounter = 1; // We are going to use this variable to pair all of the elements related to each class
	var sizerCounter = 1000;
	//Color variables
	var colorArray = [],
		colorIndex = 0,
		hex,
		typeTimer,
		typeInterval = 2000,
		lastColor;
	//
	//
	//
	//
	//---------------------------------------------------------------------------//
	//------------------------------Event Listeners------------------------------//
	//---------------------------------------------------------------------------//
	//
	//
	//
	//
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
		// findPos(this);
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
		// console.log("I'm being clicked");
	});
	//This is a test
	// var circle2 = canvas.circle(canvasHandler.width() / 2, canvasHandler.height() / 2, 50).attr({
	// 	fill: "blue",
	// 	stroke: "none",
	// 	opacity: .5,
	// });
	// var ourCircle = $("circle").last();
	// ourCircle.attr("id", "mauricio");
	// circle2.mouseover(function () {
	// 	this.attr({
	// 		fill: "red"
	// 	});
	// });
	//
	//
	//
	//
	//---------------------------------------------------------------------------//
	//-------------------------------- Functions --------------------------------//
	//---------------------------------------------------------------------------//
	//
	//
	//
	//
	//This is our main function. Here we store all the values and attributes for our circles
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
		// console.log(circles);
		// We add an ID and a class to the circle
		var ourCircle = $("circle").last();
		ourCircle.attr("class", circleCounter);
		// And then finally push it to our array of circles
		circles.push(circle);
		//Passing mouseX,mouseY and the circle counter
		//This function takes the color hex value from the API and puts it in the DIV text
		// console.log($('circleColor'));
		var handlerPos = [mouseX + 35, mouseY + 35];
		var s = canvas.circle(handlerPos[0], handlerPos[1], 10).attr({
			fill: "hsb(.8, .5, .5)",
			stroke: "none",
			opacity: .5
		});
		//We add an id and a class to our little circle.
		s.node.id = sizerCounter;
		var sizerClass = $('circle').last();
		sizerClass.attr("class", "main-circle sizer");
		var newSizerClass = $(".sizer");
		// console.log(s);
		s.hide();
		//We now assign a handler for each little circle added and a main circle in order to hide them
		var circleClass = $("." + String(circleCounter));
		var sizerID = $("#" + String(sizerCounter));
		circleClass.mouseenter(function () {
			sizerID.toggle();
		});
		circleClass.mouseleave(function () {
			sizerID.hide();
		});
		sizerID.mouseenter(function () {
			$(this).toggle();
		});
		sizerID.mouseleave(function () {
			$(this).hide();
		});
		// console.log(circleClass);
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
		}, move = function (dx, dy) {
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
				updateModel(this.attrs.cx, this.attrs.cy, this.node.className.baseVal, this.attrs.r);
			}, up = function () {
				// restoring state
				this.attr({
					opacity: .5
				});
				this.sizer.attr({
					opacity: .5
				});
			}, rstart = function () {
				// storing original coordinates
				this.ox = this.attr("cx");
				this.oy = this.attr("cy");
				this.big.or = this.big.attr("r");
			}, rmove = function (dx, dy) {
				// move will be called with dx and dy
				this.attr({
					cx: this.ox + dy,
					cy: this.oy + dy
				});
				this.big.attr({
					r: this.big.or + (dy < 0 ? -1 : 1) * Math.sqrt(2 * dy * dy)
				});
				updateModel(this.attrs.cx, this.attrs.cy, this.node.className.baseVal, this.attrs.r);
			};
		circle.drag(move, start, up);
		circle.sizer = s;
		s.drag(rmove, rstart);
		s.big = circle;
		//Here we create
		var myCodeList = $(".code-list");
		var htmlString = "<li class='" + circleCounter + "'> <span class='circle-color'> var color = <div class='circle-color-input' contentEditable autocorrect='off'> type a color</div> ; </span> <br> <span class='circle-radius'> This is a test </span> <br> <span class='circle'> This is a test </span> </li>";
		myCodeList.append(htmlString);
		updateList();
		// console.log(circle);
		circleCounter++;
		sizerCounter++;
		//I could also return a circle if I wanted
		// return circle;
	}
	// function findPos(obj) {
	// 	var curleft = curtop = 0;
	// 	if (obj.offsetParent) {
	// 		do {
	// 			curleft += obj.offsetLeft;
	// 			curtop += obj.offsetTop;
	// 		} while (obj == obj.offsetParent);
	// 	}
	// 	return [curleft, curtop];
	// }
	// //This function takes into consideration the offset of the new position on X from the canvas
	// function realXPos(obj) {
	// 	var curLeft = 0;
	// 	if (obj.offsetParent) {
	// 		do {
	// 			curLeft += obj.offsetLeft;
	// 		} while (obj == obj.offsetParent);
	// 	}
	// 	return curLeft;
	// }
	// function realYPos(obj) {
	// 	var curTop = 0;
	// 	if (obj.offsetParent) {
	// 		do {
	// 			curTop += obj.offsetTop;
	// 		} while (obj = obj.offsetParent);
	// 	}
	// 	return curTop;
	// }
	// This is also called when updating the model. Something has changed, move
	// This gets called everytime the move function gets fired.
	function updateModel(x, y, _class, r) {
		var len = circles.length;
		for (var i = 0; i < len; i++) {
			//We check if the circle that's gonna be moved exists through its class and the we
			if (circles[i].node.className.baseVal == _class) {
				circles[i].attrs.cx = x;
				circles[i].attrs.cy = y;
				circles[i].attrs.r = r;
				// console.log(x);
			}
		}
		updateList();
		//myCircleArray[id].x = x;
		//myCircleArray[id].y = y;
		// updateView();
	}
	//This is called whenever something changes within the array and renders the new values in the canvas
	function updateView() {
		$('#code').html(modelToString());
		passingColor();
	}
	//
	//
	//
	//
	//xxxxxxxxxxxxxxxxx----I won't be using this function anymore----xxxxxxxxxxxxxxxxxx////
	//
	//
	//
	//
	//
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
			html += "<li> var color = <div class='circleColor " + item.node.className.baseVal + "' contentEditable autocorrect='off'> type a color </div>; </li>" + "<li> var radius = " + parseInt(item.attrs.r) + "; </li>" + "<li> circle (" + item.attrs.cx + " ," + item.attrs.cy + ", radius); </li>";
			// outputString += "\n";
			// console.log(item.node.className.animVal);
		}
		html += "</ul> <br>";
		// return outputString;
		return html;
	}

	function updateList() {
		// <ul> 
		//  <li>
		//   <p class="">
		//   <p class="radius">
		//   <p class="circle">
		//To change that one I have put a class or an id
		var listItems = $('.code-list').find('li.' + circleCounter);
		// console.log(listItems);
		var len = circles.length;
		for (var i = 0; i < len; i++) {
			//We create one reference. This makes looking for one element more effective. Unless we need to search for a particular element
			var currentItem = circles[i];
			var updateStringRadius = "var radius = " + parseInt(currentItem.attrs.r) + ";";
			var updateStringCircle = "circle (" + currentItem.attrs.cx + " ," + currentItem.attrs.cy + ", radius)";
			//This is the div Item for the particular div of each element
			var divItem = $(listItems[i]);
			var radiusItem = divItem.find("span.circle-radius");
			var circleItem = divItem.find("span.circle");
			// console.log(currentItem.attrs.cx);
			radiusItem.text(updateStringRadius);
			// console.log($('.circle-radius').html());
			circleItem.text(updateStringCircle);
			// divItem.text(updateString);
			// console.log(divItem);
		}
	}
	//Credit where is due. This was taken from Joel Califa's example https://github.com/jcalifa/Colors
	//We are gonna use this function to pass the color to our circles from our code section
	//--------Color Functions
	function passingColor() {
		// var $colorFieldClass = $(("." + String(circleCounter));)
		var $colorFieldClass = $("li." + circleCounter).find("p.circle-color");
		// console.log($colorFieldClass);
		$colorFieldClass.click(function () {
			// console.log("I'm being clicked);
		});
		var $contentEditable = $('[contenteditable]');
		$contentEditable.on('focus', function () {
			var $this = $(this);
			$this.data('before', $this.html());
			return $this;
		});
		$contentEditable.on('blur keyup paste', function () {
			var $this = $(this);
			if ($this.data('before') !== $this.html()) {
				$this.data('before', $this.html());
				$this.trigger('change');
			}
			//console.log($(this).text());
			return $this;
		});
		$colorFieldClass.focus(function () {
			// console.log(colorArray);
		});
		$colorFieldClass.change(function () {
			// console.log("I'm being changed");
			// console.log($(this));
			var inputText = $(this).text();
			if (inputText.length > 0) {
				$.ajax({
					dataType: 'jsonp',
					url: "http://www.colourlovers.com/api/colors?keywords=" + inputText + "&numResults=20&format=json&jsonCallback=?"
				}).then(function (data) {
					colorArray = data.map(function (color) {
						return toProperHex(color.hex);
					});
					hex = colorArray[colorIndex];
					$colorFieldClass.css("color", hex);
					// console.log(colorArray, colorIndex, hex);
				});
			}
		});
		$colorFieldClass.keyup(function () {
			typeTimer = setTimeout(completeColor, typeInterval);
		});
		$colorFieldClass.keydown(function (e) {
			if (e.keyCode == 13 || e.charCode == 13) {
				var color = $circleColor.css("color");
				var text = $circleColor.text();
				return false;
			} else if (e.keyCode == 38 || e.charCode == 38) {
				toggleColor('up');
				return false;
			} else if (e.keyCode == 40 || e.charCode == 40) {
				toggleColor('down');
				return false;
			}
			clearTimeout(typeTimer);
		});
		// console.log("I have been called!");
	}

	function toProperHex(hex) {
		hex = hex.toLowerCase();
		return hex ? (hex != 'ffffff' ? "#" + hex : "#eee") : "#000";
	}

	function toggleColor(word) {
		if (word == 'up') {
			colorIndex++;
			if (colorIndex >= colorArray.length) colorIndex = 0;
		} else {
			colorIndex--;
			if (colorIndex < 0) colorIndex = colorArray.length - 1;
		}
		hex = colorArray[colorIndex];
		var $colorFieldClass = $("." + String(colorCounter));
		$colorFieldClass.css("color", hex);
	}

	function completeColor() {
		var color = $(".circleColor").text();
		if (color != lastColor && color != '') {
			//clicky.log('/colors/', color, 'search')
			lastColor = color;
		}
		clearTimeout(typeTimer);
	}
	// setInterval((function (){ addCode(xPositionsCircles)}))
});