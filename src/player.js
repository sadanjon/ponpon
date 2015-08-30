import THREE from "three";

export default class Player {

    constructor(sprite) {
        this.sprite = sprite;
        this.direction = "RIGHT";
        this.velocity = new THREE.Vector2(0, 0);
    }
}
