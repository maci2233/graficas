////////////////////////////////////////////////////////////////////////////////
/*global THREE, document, window  */
var camera, scene, renderer;
// var objects;
var group;
var cameraControls;
var delta = 100;

document.onkeydown = checkKey;
document.addEventListener( 'mousedown', onDocumentMouseDown, false )

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    // console.log(intersects);
    if ( intersects.length > 0 ) {

        window.open(intersects[0].object.userData.URL);

    }

}


function checkKey(e) {

    e = e || window.event;

		var vector = camera.getWorldDirection();

    if (e.keyCode == '38') {

			camera.position.z = camera.position.z + delta * vector.z;
			camera.position.x = camera.position.x + delta * vector.x;
    }
    else if (e.keyCode == '40') {
      camera.position.z = camera.position.z - delta * vector.z;
			camera.position.x = camera.position.x - delta * vector.x;
    }
    else if (e.keyCode == '37') {
			// camera.position.x = camera.position.x + delta;
      camera.rotation.y = camera.rotation.y + 20 * Math.PI / 180;
    }
    else if (e.keyCode == '39') {
			// camera.position.x = camera.position.x - delta;
      camera.rotation.y = camera.rotation.y - 20 * Math.PI / 180;
    }

}

var clock = new THREE.Clock();

function fillScene() {
	scene = new THREE.Scene();

	// LIGHTS

	// scene.add( new THREE.AmbientLight( 0xffffff ) );

  skyColor = 0xB1E1FF;  // light blue
  groundColor = 0xE5E5BE;  // brownish orange
  intensity = 1;
  light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);

  color = 0xFFFFFF;
  intensity = 1;
  light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);



	//grid xz
	var gridXZ = new THREE.GridHelper(2000, 100, new THREE.Color(0xCCCCCC), new THREE.Color(0x888888));
	scene.add(gridXZ);

	//axes
	var axes = new THREE.AxisHelper(150);
	axes.position.y = 1;
	scene.add(axes);

	drawMuseum();

  // var domEvents = new THREEx.DomEvent(camera, renderer.domElement);

  var planeGeometry
  var texture
  var planeMaterial
  var plane

  planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 1);
  texture = new THREE.TextureLoader().load( './assets/catapult_museum.png' );
  planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // rotate and position the plane
  // plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(10,60,-140);
  // add the plane to the scene
  plane.userData = {URL: "https://www.google.com"}
  group = new THREE.Object3D();
  group.add(plane);
  scene.add(plane);


  planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 1);
  texture = new THREE.TextureLoader().load( './assets/free_fall_museum.png' );
  planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // rotate and position the plane
  // plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(160, 60,-140);
  // add the plane to the scene
  plane.userData = {URL: "https://www.youtube.com"}
  group = new THREE.Object3D();
  group.add(plane);
  scene.add(plane);

  planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 1);
  texture = new THREE.TextureLoader().load( './assets/fire.png' );
  planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // rotate and position the plane
  // plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(310, 60,-140);
  // add the plane to the scene
  plane.userData = {URL: "https://www.youtube.com"}
  group = new THREE.Object3D();
  group.add(plane);
  scene.add(plane);




  planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 1);
  texture = new THREE.TextureLoader().load( './assets/cf_museum.png' );
  planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // rotate and position the plane
  plane.rotation.y = -1 * Math.PI;
  plane.position.set(10,60,140);
  // add the plane to the scene
  plane.userData = {URL: "https://www.google.com"}
  group = new THREE.Object3D();
  group.add(plane);
  scene.add(plane);


  planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 1);
  texture = new THREE.TextureLoader().load( './assets/stationary_museum.png' );
  planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // rotate and position the plane
  plane.rotation.y = -1 * Math.PI;
  plane.position.set(160, 60,140);
  // add the plane to the scene
  plane.userData = {URL: "https://www.youtube.com"}
  group = new THREE.Object3D();
  group.add(plane);
  scene.add(plane);

  planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 1);
  texture = new THREE.TextureLoader().load( './assets/welcome.png' );
  planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // rotate and position the plane
  plane.rotation.y = -1 * Math.PI;
  plane.position.set(310, 60,140);
  // add the plane to the scene
  plane.userData = {URL: "https://www.youtube.com"}
  group = new THREE.Object3D();
  group.add(plane);
  scene.add(plane);
}

function drawMuseum() {

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};

  /*
  The code below sets up image textures for the elephant and then imports
  the geometry from .obj files
  */
  var mtlLoader = new THREE.MTLLoader(manager);
		mtlLoader.setPath('assets/');
		 mtlLoader.load('museum.mtl', function(materials) {
		 materials.preload();

	var loader = new THREE.OBJLoader(manager);
	loader.setPath('assets/');
		loader.setMaterials(materials);
		loader.load( 'museum.obj', function ( object ) {
			object.scale.set(20,20,20);
			object.position.y = 0;
			scene.add( object );
		}, onProgress, onError); });





}

function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = window.innerWidth / window.innerHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0x000000, 1.0 );

	// CAMERA
  camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 10000);
	camera.position.x = 1316.3822829723358;
	camera.position.z = 0;
	camera.position.y = 34.61113320082892;
	camera.rotation.y = camera.rotation.y + 80 * Math.PI / 180;
  // camera.position.set(-7000, 4500, 7000);

	// CONTROLS
  // cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  // cameraControls.target.set(0, 500, 0);
}

function addToDOM() {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(renderer.domElement);
    console.log(canvas);
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	/*YOUR CODE GOES HERE
	Using the Pythagoras theorem calculate the camera position for every iteration
	*/
  const yAxis = new THREE.Vector3(0, 1, 0).normalize();

	// cameraControls.update();
	renderer.render(scene, camera);
}

try {
  init();
  fillScene();
  addToDOM();
  animate();
} catch(error) {
    console.log("Your program encountered an unrecoverable error, can not draw on canvas. Error was:");
    console.log(error);
}
