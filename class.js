(function (exports) {
  function Note(_x, _y, _z, _direction) {
    this.geometry = new THREE.SphereGeometry(10, 16, 16);
    var color;
    if (_direction) {
      color = 0xff0000;
    } else {
      color = 0x0000ff;
    }
    this.material = new THREE.MeshBasicMaterial({
      color: color
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = _x;
    this.mesh.position.y = _y;
    this.mesh.position.z = _z;
    this.direction = _direction;
    this.change = false;
    this.hit = false;
    this.left = new THREE.Vector3(1, 0, 5);
    this.right = new THREE.Vector3(-1, 0, 5);
    //scene.add(this.mesh);
  }

  Note.prototype.update = function () {
    if (!this.change) {
      if (this.direction) {
        this.mesh.position.add(this.left);
      } else {
        this.mesh.position.add(this.right);
      }
    }
  };

  function Line(a, b) {
    var material = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(a, b);
    this.mesh = new THREE.Line(geometry, material);
  }

  function Notes(_x, _direction) {
    this.notes = [];
    this.lines = [];
    this.melody = [-100, -60, 40, 80, 100, -60, -100, 80, 40, -60, 80];
    this.number = 0;
    this.x = _x;
    this.direction = _direction;
    this.end = new THREE.Vector3(0, 0, -10000);
  }

  Notes.prototype.produce = function () {
    this.notes.push(new Note(this.x, this.melody[this.number], -2600, this.direction));
    //this.
    this.number++;
    if (this.number > this.melody.length) this.number = 0;
  };

  Notes.prototype.update = function () {
    this.notes.forEach(function (note) {
      note.update();
    });
  };

  Notes.prototype.destroy = function () {
    for (var i = 0; i < this.notes.length; i++) {
      var note = this.notes[i];
      if (note.position.z > 1000 && note.mesh instanceof THREE.Mesh) {
        scene.remove(note.mesh);
        note.geometry.dispose();
        note.material.dispose();
        note.mesh = null;
        note = null;
      }
      this.notes.splice(i, 1);
    }
  };

  exports.Notes = Notes;
})(this);