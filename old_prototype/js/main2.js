window.onload = function() {
//----------------------------------------------------------//
//---------------------General Variables--------------------//
//----------------------------------------------------------//

var container, scene, camera, renderer, controls, delta, ray, mesh, geometry;
var objects = [] ;
// console.log(scope.keys);

//----------------------------------------------------------//
//--------Functions and general variables definition--------//
//----------------------------------------------------------//

function deg2Rad(x){
	return x * Math.PI / 180;
};

function rad2Deg(x){
	return x * 180 / Math.PI;
};

//----------------------------------------------------------//
//-----------------------three.js stuff---------------------//
//----------------------------------------------------------//

function init() {

	container = $('#container');
	var WIDTH = container.width(),
		HEIGHT = container.height();

	//Scene
	scene = new THREE.Scene();		
	
	//Render
	renderer = new THREE.WebGLRenderer( {antialias: true} );
	renderer.setClearColor( 0x000000 );
	renderer.setSize( WIDTH, HEIGHT);
	container.append( renderer.domelement);

	//Camera
	camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 0.1, 20000 );
	//Might need this stuff later
	camera.position.z = 100;
	camera.position.y = 10;
	camera.position.x = 20;
	scene.add(camera);

	//Create a light
	var light = new THREE.PointLight(0xffffff);
  	light.position.set(-100,200,100);
  	scene.add(light);

  	//Here we load our custom shape
	var loader = new THREE.JSONLoader();
	loader.load("threejs_objects/lightwave.js", function( geometry){
		// var material = new THREE.MeshLambertMaterial({color: 0xff0000});
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} );
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		objects.push( mesh );

	});

	//Controls
	// controls = new THREE.FirstPersonControls( camera);
	// controls.movementSpeed = 4000;
	// controls.lookSpeed = 3.0;
	// controls.lookVertical = true;

	//If Window resizing...
	window.addEventListener('resize', function(){ 

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

		renderer.setSize( WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});



	

	// container = $('#container');
	// var WIDTH = window.innerWidth,
	// 	HEIGHT = window.innerHeight;	

	// scene = new THREE.Scene();	

	//  // renderer = new THREE.CanvasRenderer();
 // 	 //  renderer.setSize(window.innerWidth, window.innerHeight);

	// renderer = new THREE.WebGLRenderer( {antialias: true} );
	// renderer.setClearColor( 0x000000 );
	// renderer.setSize( WIDTH, HEIGHT);
	// // document.body.appendChild( renderer. domElement);
	// //Here we append to our <div> container
	// // container.append( renderer.domElement);	

	// camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 0.1, 20000 );
	// //Might need this stuff later
	// camera.position.z = 1000;
	// camera.position.y = 0;
	// camera.position.x = 20;
	// scene.add(camera);
	// // cameraFocus = new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z );
	
	// // camera.lookAt( cameraFocus);

	// //Controls
	// controls = new THREE.FirstPersonControls(camera);
	// controls.lookSpeed = 0.125;
	// controls.LookVertical = false;
	// scene.add( controls );
	// scene.add( controls.getObject() );


	//---------Lights---------//

	//Create a light
	// var light = new THREE.PointLight(0xffffff);
 //  	light.position.set(-100,200,100);
 //  	scene.add(light);

 //  	var light2 = new THREE.PointLight(0xffffff);
 //  	light2.position.set( 100, 200, 100);
 //  	scene.add(light2);

 //  	var ambientLight = new THREE.AmbientLight( 0xffffff );

 //  	ray = new THREE.Raycaster();
 //    ray.ray.direction.set( 0, -1, 0 );  
 //  	scene.add(ambientLight);



	//This is a test --------------------

	// geometry = new THREE.CubeGeometry( 20, 20, 20 );

	// 			for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

	// 				var face = geometry.faces[ i ];
	// 				face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	// 				face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	// 				face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

	// 			}

	// 			for ( var i = 0; i < 500; i ++ ) {

	// 				material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

	// 				var mesh = new THREE.Mesh( geometry, material );
	// 				mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
	// 				mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
	// 				mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
	// 				scene.add( mesh );

	// 				material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

	// 				objects.push( mesh );

	// 			}
	// This is a test --------------------


	
	// window.addEventListener('resize', function(){ 

	// 	var WIDTH = window.innerWidth,
	// 		HEIGHT = window.innerHeight;

	// 		renderer.setSize( WIDTH, HEIGHT);
	// 		camera.aspect = WIDTH / HEIGHT;
	// 		camera.updateProjectionMatrix();
	// });

	//Set the background of the scene
	// renderer.setClearColor(0xedecec);
}

//This is where we draw our scene and camera
function render(){

	// container = document.getElementById('#container');
	 renderer.render( scene, camera);

}



//This is where the update 
function animate() {

	requestAnimationFrame( animate );
	render();
}

init();
animate();

};


		





