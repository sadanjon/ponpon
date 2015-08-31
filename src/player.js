import THREE from "three";

export default class Player {

    constructor(sprite) {
        this.sprite = sprite;
        this.direction = "RIGHT";
        this.isInTheAir = false;
        this.velocity = new THREE.Vector2(0, 0);
        this.position = new THREE.Vector2(0, 0);
    }
}
