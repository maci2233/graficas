var camera;
var scene;
var renderer;
var gui = new dat.GUI();
var controls = new function() {
  this.angleSpeed = 0.00001;
  this.angleAcceleration = 0.00001;
  this.originDistance = 0.00001;
  this.centripetal=0;
}

//TODO: Add controls to the gui object here (Chapter 1)
//DONE
gui.add(controls,'angleSpeed', 0, 0.5);
gui.add(controls,'angleAcceleration', 0, 0.01);
gui.add(controls,'originDistance', 0, 20);
gui.add(controls,'centripetal',0,1000);
function initStats() {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';
  document.getElementById("Stats-output")
    .appendChild( stats.domElement );
    return stats;
}

function init() {
  var stats = initStats();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);  // Note that the book uses setClearColorHex(), which will yield an error on recent versions of Three.js
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  var axes = new THREE.AxisHelper(20);
  var Syst=new THREE.Group();

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xccff00});
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 0;
  sphere.position.y = 4;
  sphere.position.z = 20;
  sphere.castShadow=true;

  //scene.add(sphere);
  Syst.add(sphere);

  var cylinderGeometry = new THREE.CylinderGeometry(0.25,0.25,1,32);
  var cylinderMaterial = new THREE.MeshLambertMaterial({color:0x39ff14});
  var cylinder=new THREE.Mesh(cylinderGeometry,cylinderMaterial);
  cylinder.position.x=0;
  cylinder.position.y=4;
  cylinder.position.z=0;
  console.log(Object.keys(cylinder));
  var axicyl=new THREE.Vector3(1,0,0);
  cylinder.rotateOnAxis(axicyl,Math.PI/2);
  Syst.add(cylinder);

  /*var lineMaterial2 = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var lineGeometry2 = new THREE.Geometry();
  lineGeometry2.vertices.push(new THREE.Vector3( 0, 4, 20) );
  lineGeometry2.vertices.push(new THREE.Vector3( 1, 4, 20) );
  var line2 = new THREE.Line( lineGeometry2, lineMaterial2 );
  Syst.add(line2);*/

  var cylinderGeometry2=new THREE.CylinderGeometry(0.2,0.2,1,32);
  var cylinderMaterial2=new THREE.MeshLambertMaterial({color:0x0000ff});
  var cylinder2=new THREE.Mesh(cylinderGeometry2,cylinderMaterial2);
  cylinder2.position.x=0;
  cylinder2.position.y=4;
  cylinder2.position.z=20;
  var axicyl2=new THREE.Vector3(0,0,1);
  cylinder2.rotateOnAxis(axicyl2,Math.PI/2);
  Syst.add(cylinder2);

  scene.add(Syst);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);

  var stepangle = 0;
  function renderScene() {
    stats.update();
    if(controls.angleSpeed<0.5){
      controls.angleSpeed+=controls.angleAcceleration;
    }
    stepangle+=controls.angleSpeed;
    cylinder2.position.z=controls.originDistance+4;
    cylinder2.scale.y=40*2*controls.angleSpeed;
    cylinder2.position.x=cylinder2.scale.y/2;
    sphere.position.z=controls.originDistance;
    cylinder.scale.y=controls.originDistance;
    cylinder.position.z=cylinder.scale.y/2;
    Syst.rotation.y=stepangle;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);
  renderScene();
};

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.onload = init;
window.addEventListener('resize', onResize, false);
