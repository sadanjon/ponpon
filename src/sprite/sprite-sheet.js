import THREE from "three";

export default class SpriteSheet {
    constructor(options) {
        if (!options)
            options = {};
        this.id = options.id;
        this.grid = options.grid;
        this.animations = options.animations;
        this.statics = options.statics;
        this.diffuseTexture = options.diffuseTexture;
    }

    getImageWidth() {
        return this.diffuseTexture.image.width;
    }

    getImageHeight() {
        return this.diffuseTexture.image.height;
    }


};