(function (exports) {
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  var videoInput = document.getElementById('inputVideo');
  var canvasInput = document.getElementById('inputCanvas');

  var container, stats;
  var camera, scene, renderer;
  var plane;
  var leftNotes, rightNotes;
  var hit;
  var frameCount = 0;
  var light1, light2, light3, light4, light5, light6;

  function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    camera = new THREE.PerspectiveCamera(23, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 6000;
    scene.add(camera);

    //Lights
    // var light = new THREE.AmbientLight(0xffffff); // soft white light
    // scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 2000);
    scene.add(directionalLight);

    var light = new THREE.PointLight(0xaa2222, 3, 50000);
    light.position.set(100, 100, 100);
    scene.add(light);

    light = new THREE.PointLight(0x2222aa, 3, 50000);
    light.position.set(-100, -100, 1000);
    scene.add(light);

    // var intensity = 2.5;
    // var distance = 100;
    // var c1 = 0xff0040,
    //   c2 = 0x0040ff,
    //   c3 = 0x80ff80,
    //   c4 = 0xffaa00,
    //   c5 = 0x00ffaa,
    //   c6 = 0xff1100;
    // //var c1 = 0xffffff, c2 = 0xffffff, c3 = 0xffffff, c4 = 0xffffff, c5 = 0xffffff, c6 = 0xffffff;

    // var sphere = new THREE.SphereGeometry(0.25, 16, 8);

    // light1 = new THREE.PointLight(c1, intensity, distance);
    // light1.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({
    //   color: c1
    // })));
    // scene.add(light1);

    // light2 = new THREE.PointLight(c2, intensity, distance);
    // light2.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({
    //   color: c2
    // })));
    // scene.add(light2);

    // light3 = new THREE.PointLight(c3, intensity, distance);
    // light3.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({
    //   color: c3
    // })));
    // scene.add(light3);

    // light4 = new THREE.PointLight(c4, intensity, distance);
    // light4.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({
    //   color: c4
    // })));
    // scene.add(light4);

    // light5 = new THREE.PointLight(c5, intensity, distance);
    // light5.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({
    //   color: c5
    // })));
    // scene.add(light5);

    // light6 = new THREE.PointLight(c6, intensity, distance);
    // light6.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({
    //   color: c6
    // })));
    // scene.add(light6);

    // var dlight = new THREE.DirectionalLight(0xffffff, 0.1);
    // dlight.position.set(0.5, -1, 0).normalize();
    // scene.add(dlight);

    // Planes

    //top wall
    plane1 = new THREE.Mesh(new THREE.PlaneGeometry(1000, 3000, 5, 15), new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      wireframe: true
    }));
    plane1.rotation.x = Math.PI / 2;
    plane1.position.y = 500;
    plane1.position.z = 50 - 1500;
    scene.add(plane1);

    //left wall
    plane2 = new THREE.Mesh(new THREE.PlaneGeometry(3000, 1000, 15, 5), new THREE.MeshPhongMaterial({
      color: 0xcccccc
    }));
    plane2.rotation.y = Math.PI / 2;
    plane2.position.x = -500;
    plane2.position.z = 50 - 1500;
    scene.add(plane2);

    //right wall
    plane3 = new THREE.Mesh(new THREE.PlaneGeometry(3000, 1000, 15, 5), new THREE.MeshPhongMaterial({
      color: 0xcccccc
    }));
    plane3.rotation.y = -Math.PI / 2;
    plane3.position.x = 500;
    plane3.position.z = 50 - 1500;
    scene.add(plane3);

    //bottom wall
    plane4 = new THREE.Mesh(new THREE.PlaneGeometry(1000, 3000, 5, 15), new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      wireframe: true
    }));
    plane4.rotation.x = -Math.PI / 2;
    plane4.position.y = -500;
    plane4.position.z = 50 - 1500;
    scene.add(plane4);

    //notes
    leftNotes = new Notes(-500, 1, scene);
    rightNotes = new Notes(500, 0, scene);

    //hiting notes
    hit = new Hit(scene);

    //renderer
    renderer = new THREE.WebGLRenderer({
      clearAlpha: 1
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  function animate() {
    requestAnimationFrame(animate);
    frameCount++;
    stats.update();

    // var time = Date.now() * 0.00025;
    // var z = 20,
    //   d = 150;

    // light1.position.x = Math.sin(time * 0.7) * d;
    // light1.position.z = Math.cos(time * 0.3) * d;

    // light2.position.x = Math.cos(time * 0.3) * d;
    // light2.position.z = Math.sin(time * 0.7) * d;

    // light3.position.x = Math.sin(time * 0.7) * d;
    // light3.position.z = Math.sin(time * 0.5) * d;

    // light4.position.x = Math.sin(time * 0.3) * d;
    // light4.position.z = Math.sin(time * 0.5) * d;

    // light5.position.x = Math.cos(time * 0.3) * d;
    // light5.position.z = Math.sin(time * 0.5) * d;

    // light6.position.x = Math.cos(time * 0.7) * d;
    // light6.position.z = Math.cos(time * 0.5) * d;

    if (frameCount % 30 === 0) {
      leftNotes.produce();
      rightNotes.produce();
    }
    leftNotes.update();
    leftNotes.hit();
    leftNotes.destroy();
    rightNotes.update();
    rightNotes.hit();
    rightNotes.destroy();

    renderer.render(scene, camera);
  }

  init();
  animate();

  // video styling
  videoInput.style.position = 'absolute';
  videoInput.style.right = '0';
  videoInput.style.zIndex = '100001';
  videoInput.style.display = 'block';

  // set up camera controller
  headtrackr.controllers.three.realisticAbsoluteCameraControl(camera, 27, [0, 0, 50], new THREE.Vector3(0, 0, 0), {
    damping: 0.5
  });

  // Face detection setup
  var htracker = new headtrackr.Tracker();
  htracker.init(videoInput, canvasInput);
  htracker.start();

  document.addEventListener('headtrackingEvent', function (event) {
    scene.fog = new THREE.Fog(0x000000, 1 + (event.z * 27), 3000 + (event.z * 27));
  }, false);

})(this);