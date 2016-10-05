var Pill = function() {

  var root = new THREE.Object3D(),
      light = new THREE.PointLight(0xffff00, 0.5, 3),
      pill = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), new THREE.MeshLambertMaterial({color: 0xffffff}));

  root.add(light);
  root.add(pill);
  return {
    object: root,
    setColor: function(colorArray) {
      pill.material.emissive.fromArray(colorArray);
      light.color.fromArray(colorArray);
    },
    setPosition: function(x, y, z) {
      pill.position.set(x, y, z)
      light.position.set(x, y, z)
    }
  };
};
