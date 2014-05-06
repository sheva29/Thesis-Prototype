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
	var rect2HandlerNewWidth = 0,
		rect2HandlerNewX = 70;
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
		rectangle2.node.attributes[0].nodeValue = rectangle.node.attributes[2].nodeValue;
		rectangle2Handler.node.attributes[0].nodeValue = +rectangle2.node.attributes[0].nodeValue + +String(20);
		console.log(rectangle2Handler.node.attributes[0].nodeValue);
		rect2HandlerNewX = rectangle2.node.attributes[0].nodeValue;
		rect2HandlerNewWidth = rectangle2Handler.node.attributes[0].nodeValue;
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
		this.ox = parseInt(rect2HandlerNewX);
		this.oy = this.attr("y");
		this.box.ow = parseInt(rect2HandlerNewWidth);
		this.box.oh = this.box.attr("height");
		console.log(this.ox);
	},
	rmove2 = function (dx, dy) {
		this.attr({
			x: this.ox + dx
			// y: this.oy + dy
		});
		this.box.attr({
			width: this.box.ow + dx
			// height: this.box.oh + dy
		});
		// console.log(rectangle2Handler.node.attributes[0].nodeValue);
	};
	rectangle2Handler.drag(rmove2, rstart2);
	rectangle2Handler.box = rectangle2;
});