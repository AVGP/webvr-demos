var VrCursor = function(parent) {
  var cursor = new THREE.Mesh(
        new THREE.RingBufferGeometry(0.02, 0.04, 8, 1),
        new THREE.MeshBasicMaterial({color: 0x008888})
      ),
      raycaster = new THREE.Raycaster(parent.position, parent.getWorldDirection(), 0.1, 0.8);

  cursor.position.z = -0.5;
  this.cursor = cursor;

  parent.add(cursor);

  this.update = function(objects) {
    raycaster.set(parent.position, parent.getWorldDirection());
    return raycaster.intersectObjects(objects, true);
  };

  return this;
};
