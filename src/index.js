import THREE from "three";
import SpriteCreator from "./sprite-creator";
import SpriteSheetCreator from "./sprite-sheet-creator";

var scene = new THREE.Scene();

var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera(-ratio * 10, ratio * 10, 5, -5, -10, 10);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var spriteCreator = new SpriteCreator();
var spriteSheetCreator = new SpriteSheetCreator();

var spriteSheet = spriteSheetCreator.create({
	id: "keen",
	path: "/resources/keen.png"
});

var sprite = spriteCreator.create({
	spriteSheet: spriteSheet,
	color: 0xff0000,
	width: 2,
	height: 1,
	position: new THREE.Vector2(0, 0)
});

scene.add(sprite.mesh);

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

render();

setTimeout(function() {
	var gl = renderer.getContext();
	var xxx = gl.getParameter(gl.CURRENT_PROGRAM);
	console.log(gl.getShaderSource(gl.getAttachedShaders(xxx)[0]));
	console.log(gl.getShaderSource(gl.getAttachedShaders(xxx)[1]));
}, 1 * 1000)