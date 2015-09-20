import THREE from "three";
import SpriteMaterial from "./sprite-material";

const DEFAULT_SPRITE_ANIMATION = {
	name: null,
	play: false,
	time: 0,
	repeat: false,
	disabled: true
};

export default class SpriteCreator {
	constructor() {
		this._geometry = null;
	}

	create(options) {
		var mesh = new THREE.Mesh(this._createGeometry(), this._createMaterial(options));
		var sprite = {
			id: options.id,
			mesh: mesh,
			spriteSheet: options.spriteSheet,
			position: options.position,
			zIndex: options.zIndex || 0,
			hidden: options.hidden,
			width: options.width,
			height: options.height,
			spriteAnimation: Object.assign({}, DEFAULT_SPRITE_ANIMATION, options.spriteAnimation),
			spriteStatic: options.spriteStatic || null,
			spriteFrame: options.spriteFrame || null,
			spriteBody: options.spriteBody || null,
			alpha: typeof options.alpha === "undefined" ? 1 : options.alpha
		};
		this._addSpriteToBodyIfDefined(sprite, options.spriteBody);
		return sprite;
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

	_addSpriteToBodyIfDefined(sprite, spriteBody) {
		if (spriteBody)
			spriteBody.sprite = sprite;
	}
}