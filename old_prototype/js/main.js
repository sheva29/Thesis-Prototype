//----------------------------------------------------------//
//---------------------General Variables--------------------//
//----------------------------------------------------------//
var container, scene, camera, renderer, controls, time, ray;
var objects = [];
// console.log(scope.keys);
//----------------------------------------------------------//
//--------Functions and general variables definition--------//
//----------------------------------------------------------//
function deg2Rad(x) {
    return x * Math.PI / 180;
};

function rad2Deg(x) {
    return x * 180 / Math.PI;
};
time = Date.now();
// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
//----------------------------------------------------------//
//-----------This is how we setup our controllers-----------//
//----------------------------------------------------------//
// var blocker = document.getElementById( 'blocker' );
// var instructions = document.getElementById( 'instructions' );
// var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
// if ( havePointerLock ) {
//     var element = document.body;
//     var pointerlockchange = function ( event ) {
// 	    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
//             controls.enabled = true;
//             blocker.style.display = 'none';
// 	    } else {
//             controls.enabled = false;
//             blocker.style.display = '-webkit-box';
//             blocker.style.display = '-moz-box';
//             blocker.style.display = 'box';
//             instructions.style.display = '';
// 	    }
//     }
//     var pointerlockerror = function ( event ) {
//             instructions.style.display = '';
//     }
//     // Hook pointer lock state change events
//     document.addEventListener( 'pointerlockchange', pointerlockchange, false );
//     document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
//     document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
//     document.addEventListener( 'pointerlockerror', pointerlockerror, false );
//     document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
//     document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
//     instructions.addEventListener( 'click', function ( event ) {
//         instructions.style.display = 'none';
//         // Ask the browser to lock the pointer
//         element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
//         if ( /Firefox/i.test( navigator.userAgent ) ) {
//             var fullscreenchange = function ( event ) {
//                 if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
//                     document.removeEventListener( 'fullscreenchange', fullscreenchange );
//                     document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
//                     element.requestPointerLock();
//                 }
//             }
//             document.addEventListener( 'fullscreenchange', fullscreenchange, false );
//             document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
//             element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
//             element.requestFullscreen();
//         } else {
//                 element.requestPointerLock();
//         }
//     }, false );
// } else {
//     instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
// }
//----------------------------------------------------------//
//-----------------------three.js stuff---------------------//
//----------------------------------------------------------//
function init() {
    container = $('#container');
    var WIDTH = container.width(),
        HEIGHT = container.height();
    scene = new THREE.Scene();
    // renderer = new THREE.CanvasRenderer();
    //  renderer.setSize(window.innerWidth, window.innerHeight);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x000000);
    renderer.setSize(WIDTH, HEIGHT);
    // document.body.appendChild( renderer. domElement);
    //Here we append to our <div> container
    container.append(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    //Might need this stuff later
    camera.position.z = 1000;
    camera.position.y = 0;
    camera.position.x = 20;
    scene.add(camera);
    // cameraFocus = new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z );
    // camera.lookAt( cameraFocus);
    //---------Lights---------//
    //Create a light
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    scene.add(light);
    var light2 = new THREE.PointLight(0xffffff);
    light2.position.set(100, 200, 100);
    scene.add(light2);
    var ambientLight = new THREE.AmbientLight(0xffffff);
    ray = new THREE.Raycaster();
    ray.ray.direction.set(0, -1, 0);
    scene.add(ambientLight);
    //Here we load our custom shape
    var loader = new THREE.JSONLoader();
    loader.load("threejs_objects/lightwave.js", function (geometry) {
        // var material = new THREE.MeshLambertMaterial({color: 0xff0000});
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        objects.push(mesh);
    });
    //This is a test --------------------
    geometry = new THREE.CubeGeometry(20, 20, 20);
    for (var i = 0, l = geometry.faces.length; i < l; i++) {
        var face = geometry.faces[i];
        face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    }
    for (var i = 0; i < 500; i++) {
        material = new THREE.MeshPhongMaterial({
            specular: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
        mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
        mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;
        scene.add(mesh);
        material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        objects.push(mesh);
    }
    //This is a test --------------------
    controls = new THREE.NewPointerLockControls(camera /*, renderer.domELement*/ );
    scene.add(controls.getObject());
    window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });
    //Set the background of the scene
    // renderer.setClearColor(0xedecec);
}
//This is where we draw our scene and camera
function render() {
    renderer.render(scene, camera);
}
// function onWindowResize() {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// }
//This is where the update 
function animate() {
    requestAnimationFrame(animate);
    controls.isOnObject(true);
    ray.ray.origin.copy(controls.getObject().position);
    ray.ray.origin.y -= 10;
    //   var intersections = ray.intersectObjects( objects );
    //   	if ( intersections.length > 0 ) {
    // 	var distance = intersections[ 0 ].distance;
    // 	if ( distance > 0 && distance < 10 ) {
    // 		controls.isOnObject( true );
    // 	}
    // }
    controls.update(Date.now() - time);
    render();
    time = Date.now();
}
init();
animate();