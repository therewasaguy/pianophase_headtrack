var camera, scene, renderer;
var geometry, material, mesh;
var unit;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  unit = new THREE.Vector3(1, 0, 1);

  document.body.appendChild(renderer.domElement);

}

//var unit = new THREE.Vector3(1, 0, 1);
function animate() {

  // note: three.js includes requestAnimationFrame shim
  requestAnimationFrame(animate);

  //console.log(mesh.position instanceof THREE.Vector3);
  //console.log(mesh.position, unit);
  mesh.position.add(unit);
  //mesh.position = mesh.position.add(mesh.position, unit);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;

  renderer.render(scene, camera);

}