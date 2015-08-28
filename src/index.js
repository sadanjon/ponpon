import THREE from "three";
import {SpriteCreator,SpriteSheetCreator, SpriteUpdater} from "./sprite";
import StageBuilder from "./stage-builder";


var scene = new THREE.Scene();

var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera(-ratio * 5, ratio * 5, 5, -5, -10, 10);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var stageBuilder = new StageBuilder();
var spriteUpdater = new SpriteUpdater();

stageBuilder.build({
	"spriteSheets": {
		"keen": {
			"diffusePath": "/resources/sprite1.png",
			"grid": {
				"repeat": [32, 32],
				"offset": [0, 0]
			},
			"animations": {
				"run-left": {
					"start": -2,
					"end": -5,
					"fps": 25
				},
				"run-right": {
					"start": 1,
					"end": 4,
					"fps": 25	
				}
			},
			"statics": {
				"stand-left": 0,
				"stand-right": -1
			}
		}
	},
	"sprites": {
		"keen": {
			"spriteSheet": "keen",
			"width": 2,
			"height": 2,
			"position": [0, 0, 0],
			"hidden": false,
			"spriteAnimation": {
				"name": "run-right",
				"play": true,
				"time": 0
			}
		}
	}
})
.then(stage => {
	scene.add(stage.sprites.keen.mesh);

	camera.position.z = 5;

	var lastTime = 0;
	function render(t) {
		update(t - lastTime);
		lastTime = t;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	function renderInitial(t) {
		lastTime = t;
		requestAnimationFrame(render);
	}

	function update(dt) {
		spriteUpdater.update(stage.sprites.keen, dt);
	}	

	requestAnimationFrame(renderInitial);
});






