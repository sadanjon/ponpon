import THREE from "three";

export default class SpriteCreator {
	constructor() {
		this._geometry = null;
	}

	create(options) {
		var mesh = new THREE.Mesh(this._createGeometry(), this._createMaterial(options));
		mesh.scale.x = options.width;
		mesh.scale.y = options.height;
		return {
			mesh: mesh
		};
	}

	_createMaterial(options) {
		return new THREE.MeshBasicMaterial({
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