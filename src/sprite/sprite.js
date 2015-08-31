import THREE from "three";

export default class Sprite {
    constructor(options) {
        options = options || {};
        this.id = options.id;
        this.mesh = options.mesh;
        this.spriteSheet = options.spriteSheet;
        this.position = options.position;
        this.zIndex = options.zIndex || 0;
        this.hidden = options.hidden;
        this.width = options.width;
        this.height = options.height;
        this.spriteAnimation = options.spriteAnimation || {name: null, play: false, time: 0, disabled: true};
        this.spriteStatic = options.spriteStatic || null;
    }
}