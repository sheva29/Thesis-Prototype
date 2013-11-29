
var container, scene, camera, renderer, keys, cameraFocus;
// console.log(scope.keys);

//We assigned our keys here to a new variable to store them in an object
keys = {
	__setControl: function (n, state){
		switch (n) {
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

function deg2Rad(x){
	return x * Math.PI / 180;
};

//Here we pass our custom function to jQuery keyPressed
$(document).keydown( function (e) {
	keys.__setControl( e.keyCode, true);
	// console.log("key has been pressed \n");
});

//Here we pass our custom function to jQuery keyReleased
$(document).keyup( function (e) {
	keys.__setControl( e.keyCode, true );
	keys.__setControl( e.keyCode, false );

});

function init() {

	container = $('#container');
	var WIDTH = container.width(),
		HEIGHT = container.height();


	scene = new THREE.Scene();
	// var WIDTH = window.innerWidth,
	// 	HEIGHT = window.innerHeight;

		// renderer = new THREE.CanvasRenderer();
  //   	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer = new THREE.WebGLRenderer( {antialias: true} );
	renderer.setSize( WIDTH, HEIGHT);
	// document.body.appendChild( renderer. domElement);
	//Here we append to our <div> container
	container.append( renderer.domElement);

	camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 0.1, 20000 );
	camera.position.z = 0;
	camera.position.y = 0;
	camera.position.x = 20;
	cameraFocus = new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z );
	scene.add(camera);
	camera.lookAt( cameraFocus);

	window.addEventListener('resize', function(){ 

		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

			renderer.setSize( WIDTH, HEIGHT);
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
	});

	//Set the background of the scene
	renderer.setClearColor(0xedecec, 1);

	//---------Lights---------//

	//Create a light
	var light = new THREE.PointLight(0xffffff);
  	light.position.set(-100,200,100);
  	scene.add(light);

  	var light2 = new THREE.PointLight(0xffffff);
  	light2.position.set( 100, 200, 100);
  	scene.add(light2);

  	var ambientLight = new THREE.AmbientLight( 0xffffff );
  	scene.add(ambientLight);

	//Here we load our custom shape
	var loader = new THREE.JSONLoader();
	loader.load("threejs_objects/lightwave.js", function( geometry){
		// var material = new THREE.MeshLambertMaterial({color: 0xff0000});
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} );
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		});

	controls = new THREE.OrbitControls(camera, renderer.domELement);

}

function update(){

		//Coefficient at which the camera will be moving
		var distance = 2;

		//Calculate next position
		var x = Math.sin( camera.rotation.y ) * distance * -1;
			y = Math.sin( camera.rotation.x ) * distance;
			z = 3;

	if(keys.w){

		//Move the forward	
		cameraFocus.z -= z;	
		// cameraFocus.translateZ( -z );
		
		// cameraFocus.x -= z;
		// cameraFocus.y -= z;
		
	}

	if(keys.s){
		//Move away from the target/reverse
		camera.position.z += z;
	}

	if( keys.left){
		//rotate the camera 
		camera.rotation.y += deg2Rad(2.5);
		console.log("key has been pressed");

	}


}

function render(){



	renderer.render( scene, camera);

}



//This is where the update of
function animate() {

	requestAnimationFrame( animate );
	
	controls.update();
	update()
	render();


}

init();
animate();



		





