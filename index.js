var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer({
  antialias: true,
});

cam.position.z += 20;
cam.position.y += 10;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
// renderer.setClearColor("#fff");

// renderer.toneMapping = THREE.LinearToneMapping;
// renderer.toneMappingExposure = Math.pow(0.94, 5.0);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color(0xfdfdfd);

window.addEventListener(
  "resize",
  function () {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

document.body.appendChild(renderer.domElement);

// Instantiate a loader
const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
  // resource URL
  "sekret.gltf",
  // called when the resource is loaded
  function (gltf) {
    let sekret = gltf.scene;
    sekret.position.set(0, -3, 0);
    scene.add(sekret);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

let pGeo = new THREE.PlaneGeometry(5, 5, 10, 10);
let pMat = new THREE.MeshPhongMaterial({
  color: 0xfff,
  side: THREE.DoubleSide,
});

// pMat.map = texture;

let pMesh = new THREE.Mesh(pGeo, pMat);
pMesh.rotation.x -= Math.PI / 2;
pMesh.position.set(0, -3.1, 0);
pMesh.recieveShadow = true;
scene.add(pMesh);

var pLight = new THREE.PointLight(0xffffcc, 2, 100);
pLight.position.set(0, 30, 20);
// pLight.castShadow = true;
scene.add(pLight);
// scene.add(new THREE.PointLightHelper(pLight, 0.2, 0x000));

var light2 = new THREE.AmbientLight(0x20202a, 7, 100);
light2.position.set(30, -10, 30);
scene.add(light2);

let controls = new THREE.OrbitControls(cam, renderer.domElement);

let renderCalls = [];
function update() {
  // renderer.render(scene, cam);
  requestAnimationFrame(update);
  renderCalls.forEach((callback) => {
    callback();
  });
}
//
update();

function renderScene() {
  renderer.render(scene, cam);
}
renderCalls.push(renderScene);
