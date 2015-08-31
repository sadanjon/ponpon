import THREE from "three";
import SpriteMaterial from "./sprite-material";
import Sprite from "./sprite";

export default class SpriteCreator {
	constructor() {
		this._geometry = null;
	}

	create(options) {
		var mesh = new THREE.Mesh(this._createGeometry(), this._createMaterial(options));
		return new Sprite({
			id: options.id,
			mesh: mesh,
			spriteSheet: options.spriteSheet,
			position: options.position,
			zIndex: options.zIndex,
			hidden: options.hidden,
			width: options.width,
			height: options.height,
			spriteAnimation: options.spriteAnimation,
			spriteStatic: options.spriteStatic
		});
	}

	_createMaterial(options) {
		return new SpriteMaterial({
			diffuseTexture: options.spriteSheet.diffuseTexture
		});
	}

	_createGeometry() {
		if (!this._geometry)
			this._geometry = new THREE.PlaneBufferGeometry(1, 1);
		return this._geometry;
	}
}