import THREE from "three";

export default class SpriteSheetCreator {

	create(options) {
		return this._loadTexture(options.diffusePath)
		.then(diffuseTexture => {
			return {
				id: options.id,
				grid: options.grid,
				animations: options.animations,
				statics: options.statics,
				diffuseTexture: diffuseTexture
			};
		});
	}

	_loadTexture(url) {
		return new Promise((resolve, reject) => {
			THREE.ImageUtils.loadTexture(url, void 0,
				result => {
					this._setNearestFiltering(result);
					this._setWrapModes(result);
					resolve(result);
				},
				() => {
					reject(new Error("Failed to load texture: " + url));
				});
		});
	}

	_setNearestFiltering(texture) {
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
	}

	_setWrapModes(texture) {
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
	}
}