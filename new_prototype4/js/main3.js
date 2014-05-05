$(document).ready(function () {
	var canvas = Raphael("container", 500, 500);
	var rectPosX = 10,
		rectPosY = 10,
		rectWidth = 50,
		rectHeight = 100,
		rect2PosX = rectPosX + rectWidth,
		rect2PosY = rectPosY;
	rect2Width = 30,
	rect2Height = 100;
	var rectangle = canvas.rect(rectPosX, rectPosY, rectWidth, rectHeight).attr({
		fill: "red"
	});
	var rectangleHandler = canvas.rect(30, 80, 20, 20).attr({
		fill: "hsb(.8, .5, .5)"
	});
	var rectangle2 = canvas.rect(rect2PosX, rect2PosY, rect2Width, rect2Height).attr({
		fill: "blue"
	});
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
		console.log(rectangle2);
	};
	rectangleHandler.drag(rmove, rstart);
	rectangleHandler.box = rectangle;
	// console.log(rmove);
	// rectangle.transform("t" + rectPosX ,250");
});