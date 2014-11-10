(function (exports) {
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  var container, controls, stats;
  var camera, scene, fog, light, renderer, effect;
  var geometry, material, mesh;
  var colors = [
    0x1abc9c,
    0xf1c40f,
    0xd35400,
    0x27ae60,
    0x006CB7,
    0x3498db,
    0x8e44ad,
    0xe74c3c,
    0xF47E43,
    0x752763,
    0x4D947A,
    0xDA4952,
    0x2E4DA7
  ];
  var colorIndex = 0;

  function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 6000;

    // controls = new THREE.TrackballControls(camera);

    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;

    // controls.noZoom = false;
    // controls.noPan = false;

    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;

    // controls.keys = [65, 83, 68];

    // controls.addEventListener('change', render);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 5000);

    //LIGHTS

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    //

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);

    // Planes

    //top wall
    var plane1 = new THREE.Mesh(new THREE.PlaneGeometry(500, 3000, 5, 15), new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true
    }));
    plane1.rotation.x = Math.PI / 2;
    plane1.position.y = 250;
    plane1.position.z = 50 - 1500;
    scene.add(plane1);

    //left wall
    var plane2 = new THREE.Mesh(new THREE.PlaneGeometry(3000, 500, 15, 5), new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true
    }));
    plane2.rotation.y = Math.PI / 2;
    plane2.position.x = -250;
    plane2.position.z = 50 - 1500;
    scene.add(plane2);

    //right wall
    var plane3 = new THREE.Mesh(new THREE.PlaneGeometry(3000, 500, 15, 5), new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true
    }));
    plane3.rotation.y = -Math.PI / 2;
    plane3.position.x = 250;
    plane3.position.z = 50 - 1500;
    scene.add(plane3);

    //bottom wall
    var plane4 = new THREE.Mesh(new THREE.PlaneGeometry(500, 3000, 5, 15), new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true
    }));
    plane4.rotation.x = -Math.PI / 2;
    plane4.position.y = -250;
    plane4.position.z = 50 - 1500;
    scene.add(plane4);

    for (var i = 0; i < 30; i++) {
      geometry = new THREE.PlaneGeometry(20, 50);
      material = new THREE.MeshLambertMaterial({
        color: colors[colorIndex]
      });
      colorIndex++;
      if (colorIndex > colors.length) colorIndex = 0;
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.random();
      mesh.rotation.y = Math.random();
      mesh.rotation.z = Math.random();
      mesh.position.x = Math.random() * 200 - 100;
      mesh.position.y = Math.random() * 200 - 100;
      mesh.position.z = Math.random() * 300 - 200;
      scene.add(mesh);
    }

    // renderer

    renderer = new THREE.WebGLRenderer({
      clearAlpha: 1,
      antialias: false
    });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

    //

    render();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //controls.handleResize();
    render();
  }

  function animate() {
    requestAnimationFrame(animate);
    //render();
    //controls.update();
  }

  function render() {
    renderer.render(scene, camera);
    stats.update();
  }

  init();
  animate();

  // set up camera controller
  headtrackr.controllers.three.realisticAbsoluteCameraControl(camera, 20, [0, 0, 50], new THREE.Vector3(0, 0, 0), {
    damping: 0.5
  });

  // Face detection setup
  // var htracker = new headtrackr.Tracker();
  // htracker.init(videoInput, canvasInput);
  // htracker.start();

  document.addEventListener('headtrackingEvent', function (event) {
    scene.fog = new THREE.Fog(0x000000, 1 + (event.z * 27), 3000 + (event.z * 27));
  }, false);
})(this);