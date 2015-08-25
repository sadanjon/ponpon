import THREE from "three";
import SpriteMaterial from "./sprite-material";

export default class SpriteCreator {
	constructor() {
		this._geometry = null;
	}

	create(options) {
		var mesh = new THREE.Mesh(this._createGeometry(), this._createMaterial(options));
		mesh.scale.x = options.width;
		mesh.scale.y = options.height;
		mesh.position.x = options.position.x;
		mesh.position.y = options.position.y;
		return {
			mesh: mesh
		};
	}

	_createMaterial(options) {
		return new SpriteMaterial({
			color: options.color
		});
	}

	_createGeometry() {
		if (!this._geometry)
			this._geometry = new THREE.PlaneBufferGeometry(1, 1);
		console.log(this._geometry);
		return this._geometry;
	}
}