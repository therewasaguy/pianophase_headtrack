(function (exports) {
  function Note(_x, _y, _z, _direction) {
    var geometry = new THREE.SphereGeometry(10, 16, 16);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = _x;
    this.mesh.position.y = _y;
    this.mesh.position.z = _z;
    this.direction = _direction;
    this.change = false;
    scene.add(this.mesh);
  }

  Note.prototype.update = function () {
    if (!change) {
      if (direction) {
        this.mesh.position.x += 10;
      } else {
        this.mesh.position.x -= 10;
      }
    }
    this.mesh.position.z += 10;
  };

  function Notes() {
    this.notes = [];
    this.melody = [-100, -60, 40, 80, 100, -60, -100, 80, 40, -60, 80];
    this.number = 0;
  }

  Notes.prototype.produce = function () {

  }

  Notes.prototype.destroy = function () {
    this.notes.traverse(function (note) {
      if
    })
  }

  exports.Note = Note;
  exports.Notes = Notes;
})(this);