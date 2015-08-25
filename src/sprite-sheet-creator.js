import THREE from "three";

export default class SpriteSheetCreator {
	constructor() {
	}

	create(options) {
		var texture = THREE.ImageUtils.loadTexture(options.path);
		return {
			id: options.id,
			texture: texture
		};
	}

	
}