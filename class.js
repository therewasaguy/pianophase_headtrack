(function (exports) {
  function Note(_x, _y, _z, _direction, _scene) {
    this.geometry = new THREE.SphereGeometry(10, 16, 16);
    var color;
    switch (_direction) {
    case 0:
      color = 0xffff00;
      break;
    case 1:
      color = 0x00ffff;
      break;
    case 2:
      color = 0xffffff;
    }
    this.material = new THREE.MeshLambertMaterial({
      color: color
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = _x;
    this.mesh.position.y = _y;
    this.mesh.position.z = _z;
    _scene.add(this.mesh);

    // var intensity = 2.5;
    // var distance = 5000;
    // this.light = new THREE.PointLight(color, intensity, distance);
    // _scene.add(this.light);

    this.direction = _direction;
    this.change = false;
    this.hit = false;
    this.left = new THREE.Vector3(1, 0, 6);
    this.right = new THREE.Vector3(-1, 0, 6);

  }

  // Note.prototype.play = function(){

  // }

  Note.prototype.update = function () {
    if (!this.change) {
      if (this.direction) {
        this.mesh.position.add(this.left);
      } else {
        this.mesh.position.add(this.right);
      }
    } else {
      this.mesh.position.add(new THREE.Vector3(0, 0, 6));
    }
  };

  function Line(a, b, _direction, _scene) {
    var color;
    switch (_direction) {
    case 0:
      color = 0xffff00;
      break;
    case 1:
      color = 0x00ffff;
      break;
    case 2:
      color = 0xffffff;
    }
    this.material = new THREE.LineBasicMaterial({
      color: color
    });
    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(a, b);
    this.mesh = new THREE.Line(this.geometry, this.material);
    _scene.add(this.mesh);

    //this.geometry.verticesNeedUpdate = true;
  }

  Line.prototype.update = function (a, b) {
    this.geometry.verticesNeedUpdate = true;
    this.geometry.vertices[0] = a;
    this.geometry.vertices[1] = b;
  };

  function Notes(_x, _direction, _scene) {
    this.notes = [];
    this.lines = [];
    this.melody = [-100, -60, 40, 80, 100, -60, -100, 80, 40, -60, 80];
    this.number = 0;
    this.x = _x;
    this.direction = _direction;
    this.end = new THREE.Vector3(0, 0, -10000);
    this.scene = _scene;
  }

  Notes.prototype.produce = function () {
    this.notes.push(new Note(this.x, this.melody[this.number], -2600, this.direction, this.scene));
    this.number++;
    if (this.number > this.melody.length) {
      this.number = 0;
    }
    if (this.notes.length > 1) {
      var pre = this.notes[this.notes.length - 2];
      var nex = this.notes[this.notes.length - 1];
      this.lines.push(new Line(pre.mesh.position, nex.mesh.position, this.direction, this.scene));
    }
  };

  Notes.prototype.update = function () {
    for (var i = 0; i < this.notes.length; i++) {
      this.notes[i].update();
      if (i === this.notes.length - 1) {
        break;
      }
      this.lines[i].update(this.notes[i].mesh.position, this.notes[i + 1].mesh.position);
    }
  };

  Notes.prototype.hit = function () {
    this.notes.forEach(function (note, index) {
      if (note.mesh.position.z > 390) {
        note.change = true;
      }
    });
  };

  Notes.prototype.destroy = function () {
    if (this.notes.length > 2) {
      if (this.notes[0].mesh.position.z > 2000 && this.notes[1].mesh.position.z > 2000) {
        this.scene.remove(this.notes[0].mesh);
        this.notes[0].geometry.dispose();
        this.notes[0].material.dispose();
        this.notes[0].mesh = null;
        this.notes[0] = null;
        this.scene.remove(this.notes[1].mesh);
        this.notes[1].geometry.dispose();
        this.notes[1].material.dispose();
        this.notes[1].mesh = null;
        this.notes[1] = null;

        //console.log(this.notes.length);
        //delete the line between them
        this.scene.remove(this.lines[0].mesh);
        this.lines[0].geometry.dispose();
        this.lines[0].material.dispose();
        this.lines[0].mesh = null;
        this.lines[0] = null;

        //remove these two balls in the array, also the line between them
        this.notes.splice(0, 2);
        this.lines.splice(0, 1);
      }
    }
  };

  function Hit(_scene) {
    this.notes = [];
    var melody = [-100, -60, 40, 80, 100, -60, -100, 80, 40, -60, 80];
    for (var i = 0; i < 12; i++) {
      this.notes.push(new Note(0, melody[i], 390, 2, _scene));
    }
    var material = new THREE.LineBasicMaterial({
      color: 0xffffff
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 500, 390), new THREE.Vector3(0, -500, 390));
    var mesh = new THREE.Line(geometry, material);
    _scene.add(mesh);
  }

  exports.Notes = Notes;
  exports.Hit = Hit;
})(this);