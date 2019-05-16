var camera;
var scene;
var renderer;
var gui = new dat.GUI();
var controls = new function() {
  this.speed = 1;
  this.numharmonic=1;
  this.addharmonic=function(){
    if(this.numharmonic<4){
      this.numharmonic++;
    }
  }
  this.removeharmonic=function(){
    if(this.numharmonic>1){
      this.numharmonic--;
    }
  }
}


//TODO: Add controls to the gui object here (Chapter 1)
//DONE
gui.add(controls,'speed', 0.01, 5);
gui.add(controls,'addharmonic');
gui.add(controls,'removeharmonic');
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

  var pointscurve=[];
  for(var i=0;i<10000;i++){
    pointscurve.push(new THREE.Vector3(-10+20*i/10000.0,0,0));
  }
  var curve = new THREE.CatmullRomCurve3(pointscurve);
  curve.curveType = 'catmullrom';
  var geometry = new THREE.TubeGeometry( curve, 20, 0.1, 8, false );
  var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  var mesh = new THREE.Mesh( geometry, material );
  Syst.add(mesh);
  scene.add(Syst);

  camera.position.x = 0;
  camera.position.y = 10;
  camera.position.z = 10;
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);

  var stepangle = 0;
  var tme=0.0;
  function renderScene() {
    stats.update();
    tme++;
    for(var i=0;i<10000;i++){
      curve.points[i].y=2*2*Math.sin(2*Math.PI*curve.points[i].x/(20/controls.numharmonic))*Math.cos(controls.speed*tme/(50.0));
    }
    var geo2=new THREE.TubeGeometry( curve, 20, 0.1, 8, false );
    mesh.geometry.dispose();
    mesh.geometry=geo2;
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
