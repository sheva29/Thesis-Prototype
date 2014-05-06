$(document).ready(function () {
	var canvas = Raphael("container", 500, 500);
	var rectPosX = 0,
		rectPosY = 0,
		rectWidth = 50,
		rectHeight = 100,
		rect2PosX = rectPosX + rectWidth,
		rect2PosY = rectPosY;
	rect2Width = 30,
	rect2Height = 100;
	var rectangle = canvas.rect(rectPosX, rectPosY, rectWidth, rectHeight).attr({
		fill: "red"
	});
	var rectangleHandler = canvas.rect(40, 0, 10, 100).attr({
		fill: "hsb(.8, .5, .5)"
	});
	var rectangle2 = canvas.rect(rect2PosX, rect2PosY, rect2Width, rect2Height).attr({
		fill: "blue"
	});
	var rectangle2Handler = canvas.rect(70, 0, 10, 100).attr({
		fill: "green"
	});
	var rect2HandlerNewX = 70;
	//
	//
	//These are the functions for the first rectangle
	//
	//
	rstart = function () {
		this.ox = this.attr("x");
		this.oy = this.attr("y");
		this.box.ow = this.box.attr("width");
		this.box.oh = this.box.attr("height");
		console.log(rect2HandlerNewX);
	},
	rmove = function (dx, dy) {
		this.attr({
			x: this.ox + dx
			// y: this.oy + dy
		});
		this.box.attr({
			width: this.box.ow + dx
			// height: this.box.oh + dy
		});
		//Every time we resize the first square we want to push the origin of the second one
		rectangle2.node.attributes[0].nodeValue = rectangle.node.attributes[2].nodeValue;
		//We store the new position of the second square handler in a variable. The new position will be in respect to the both widths of the squares
		rect2HandlerNewX = (+rectangle2.node.attributes[2].nodeValue + +rectangle.node.attributes[2].nodeValue) - +String(10);
		//Then we pass it to the
		rectangle2Handler.node.attributes[0].nodeValue = String(rect2HandlerNewX);
		// console.log(rectangle2Handler.node.attributes[0].nodeValue);
		// rect2HandlerNewX = rectangle2.node.attributes[0].nodeValue;
		// console.log(this.box.ow);
		console.log("handler position = " + rectangleHandler.node.attributes[0].nodeValue);
		// console.log(rectangle2Handler.node.attributes[0].nodeValue);
		// console.log(rectangle2.node.attributes[2].nodeValue);
		// console.log(rectangle2);
	};
	rectangleHandler.drag(rmove, rstart);
	rectangleHandler.box = rectangle;
	//
	//
	//These are the functions for the second rectangle
	//
	//
	rstart2 = function () {
		// if (rect2HandlerNewX == 0) {
		// 	rect2HandlerNewX = this.attr("y");
		// }
		// this.ox = parseInt(rect2HandlerNewX);
		console.log(rect2HandlerNewX);
		this.ox = rect2HandlerNewX;
		this.oy = this.attr("y");
		// this.box.ow = parseInt(rect2HandlerNewWidth);
		this.box.ow = this.box.attr("width");
		this.box.oh = this.box.attr("height");
		// console.log(this.box.attr);
	},
	rmove2 = function (dx, dy) {
		this.attr({
			x: +this.ox + dx
			// y: this.oy + dy
		});
		this.box.attr({
			width: this.box.ow + dx
			// height: this.box.oh + dy
		});
		console.log("handler position = " + rectangleHandler.node.attributes[0].nodeValue);
		// rectangle2Handler.node.attributes[0].nodeValue = rect2HandlerNewX + dx;
		// console.log(this.box.ow);
		// console.log(rectangle2Handler.node.attributes[0].nodeValue);
	};
	rectangle2Handler.drag(rmove2, rstart2);
	rectangle2Handler.box = rectangle2;
	console.log(rectangle2Handler);
});