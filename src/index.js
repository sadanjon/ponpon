import "babel-core/polyfill";
import THREE from "three";
import {SpriteCreator, SpriteSheetCreator, SpriteUpdater} from "./sprite";
import StageBuilder from "./stage-builder";
import InputService from "./input-service";
import PlayerUpdater from "./player-updater";
import Player from "./player";
import p2 from "p2";

var scene = new THREE.Scene();

var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera(-ratio * 5, ratio * 5, 5, -5, -10, 10);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var stageBuilder = new StageBuilder();
var spriteUpdater = new SpriteUpdater();
var inputService = new InputService();

stageBuilder.build(require("../resources/stage.json"))
.then(stage => {
	var p2World = new p2.World();
	p2World.solver.iterations = 200;
	p2World.solver.tolerance = 0;
	p2World.islandSplit = true;
	p2World.sleepMode = p2.World.ISLAND_SLEEPING;
	p2World.setGlobalStiffness(1e4);

	//var planeShape = new p2.Plane();
	//var planeBody = new p2.Body({
	//	mass: 0,
	//	position: [0, -2]
	//});
	//planeBody.addShape(planeShape);
	//p2World.addBody(planeBody);

	var boxMaterial = new p2.Material();
	var planeMaterial = new p2.Material();

	p2World.defaultContactMaterial = new p2.ContactMaterial(boxMaterial, planeMaterial, {
		restitution: 0,
		relaxation: 1e10
	});
	console.log(p2World.defaultContactMaterial);

    p2World.addBody(stage.sprites.keen.spriteBody);
	var player = new Player(stage.sprites.keen);
	var playerUpdater = new PlayerUpdater(inputService, player);

	scene.add(stage.sprites.keen.mesh);

    stage.tileSprites.forEach(sprite => {
        scene.add(sprite.mesh);
        if (sprite.body)
            p2World.addBody(sprite.body);
    });

	camera.position.z = 5;

	playerUpdater.startListening();

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
		p2World.step(dt / 1000);
		playerUpdater.update(dt);
		spriteUpdater.update(stage.sprites.keen, dt);
        for (var i = 0; i < stage.tileSprites.length; ++i) {
            //console.log(stage.tileSprites[i].position.x, stage.tileSprites[i].position.x);
            spriteUpdater.update(stage.tileSprites[i], dt);
        }
	}

	requestAnimationFrame(renderInitial);
});






