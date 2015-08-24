import THREE from "three";
import SpriteCreator from "./sprite-creator";

var scene = new THREE.Scene();

var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera(-ratio * 10, ratio * 10, 5, -5, -10, 10);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var spriteCreator = new SpriteCreator();

var sprite = spriteCreator.create({
	color: 0xff0000,
	width: 2,
	height: 1
});

scene.add(sprite.mesh);

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

render();