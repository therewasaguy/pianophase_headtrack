(function (exports) {

  if (!Detector.webgl) Detector.addGetWebGLMessage();

  var container, stats;
  var camera, scene, light, renderer, effect;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  var isUserInteracting = false,
    onMouseDownMouseX = 0,
    onMouseDownMouseY = 0,
    lon = 90,
    onMouseDownLon = 0,
    lat = 0,
    onMouseDownLat = 0,
    phi = 0,
    theta = 0,
    target = new THREE.Vector3();

  function init() {
    var container, mesh;

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    // LIGHTS

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    //

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);

    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

    var material = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('texture/2294472375_24a3b8ef46_o.jpg')
      //color: 0xffffff
    });

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    for (var i = 0; i < 100; i++) {
      geometry = new THREE.BoxGeometry(40, 40, 40);
      material = new THREE.MeshLambertMaterial({
        color: 222222
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 500 - 500;
      mesh.position.y = Math.random() * 500 - 500;
      mesh.position.z = Math.random() * 500 - 500;
      scene.add(mesh);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();
    isUserInteracting = true;
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }

  function onDocumentMouseMove(event) {
    if (isUserInteracting === true) {
      lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    }
  }

  function onDocumentMouseUp(event) {
    isUserInteracting = false;
  }

  function onDocumentMouseWheel(event) {

    // WebKi
    if (event.wheelDeltaY) {
      camera.fov -= event.wheelDeltaY * 0.05;
      // Opera / Explorer 9
    } else if (event.wheelDelta) {
      camera.fov -= event.wheelDelta * 0.05;
      // Firefox
    } else if (event.detail) {
      camera.fov += event.detail * 1.0;
    }
    camera.updateProjectionMatrix();
  }

  function update() {
    if (isUserInteracting === false) {
      lon += 0.1;
    }
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    target.x = 500 * Math.sin(phi) * Math.cos(theta);
    target.y = 500 * Math.cos(phi);
    target.z = 500 * Math.sin(phi) * Math.sin(theta);
    //camera.position.copy(target).negate();
    //camera.lookAt(target);
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
  }

  init();
  animate();

})();