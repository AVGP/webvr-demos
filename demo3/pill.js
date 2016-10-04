var Pill = function() {

  var root = new THREE.Object3D(),
      light = new THREE.PointLight(0xffff00, 2.0, 5),
      pill = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshBasicMaterial({color: 0xffff00, emissive: 0xffff00}));

  root.add(light);
  root.add(pill);
  return root;
};
