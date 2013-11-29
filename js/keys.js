//We assigned our keys here to a new variable to store them

window.scope = {};

scope.keys = {
	setControl: function (n, state){
		switch(n) {
			//Left arrow key
			case 37:
				this.left = state;
				break;
			//Up arrow key
			case 38:
				this.up = state;
				break;
			//Right arrow key
			case 39:
				this.right = state;
				break;
			//Down arrow key
			case 40:
				this.down = state;
				break;
			//"W" key
			case 87:
				this.w = state;
				break;
			//"A" key
			case 65:
				this.a = state;
				break;
			//"S" key
			case 83:
				this.s = state;
				break;
			//"D" key
			case 68:
				this.d = state;
				break;
		}
	}
};
scope.cachedOptions = JSON.parse(JSON.stringify(scope.keys));

//Here we pass our custom function to jQuery keyPressed
$(document).keydown( function (e) {
	keys.setControl( e.keyCode, true);
	// console.log("key has been pressed \n");
});

//Here we pass our custom function to jQuery keyReleased
$(document).keyup( function (e) {
	keys.setControl( e.keyCode, true );
	keys.setControl( e.keyCode, false );

});





