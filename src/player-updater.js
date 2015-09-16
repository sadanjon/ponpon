import THREE from "three";

export default class PlayerUpdater {

    constructor(inputService, player) {
        this._inputService = inputService;
        this._player = player;
        this._listenerId = null;
        this._runVelocity = 7.5;
    }

    startListening() {
        this._listenerId = this._inputService.addListener((key, mappedKey, isPressed) => {
            if (mappedKey === "UP" && isPressed) {
                this._player.sprite.spriteBody.velocity[1] = 20;
            }
        });
    }

    stopListening() {
        this._inputService.removeListener(this._listenerId);
    }

    update(dt) {
        this._updatePlayer(dt);
        this._updatePlayerSpriteAnimation();
    }

    _updatePlayer(dt) {
        if (this._inputService.isMappingPressed("LEFT")) {
            this._player.direction = "LEFT";
            this._player.sprite.spriteBody.velocity[0] = -this._runVelocity;
        } else if (this._inputService.isMappingPressed("RIGHT")) {
            this._player.direction = "RIGHT";
            this._player.sprite.spriteBody.velocity[0] = this._runVelocity;
        } else {
            this._player.sprite.spriteBody.velocity[0] = 0;
        }
    }

    _updatePlayerSpriteAnimation() {
        var anim = this._player.sprite.spriteAnimation;
        var isRunning = Math.abs(this._player.sprite.spriteBody.velocity[0]) > 0;
        if (!isRunning && this._player.direction === "RIGHT") {
            this._player.sprite.spriteStatic = "stand-right";
            anim.disabled = true;
        } else if (!isRunning && this._player.direction === "LEFT") {
            this._player.sprite.spriteStatic = "stand-left";
            anim.disabled = true;
        } else if (isRunning && this._player.direction === "RIGHT" && (anim.name !== "run-right" || anim.disabled || !anim.play)) {
            anim.name = "run-right";
            anim.play = true;
            anim.time = 0;
            anim.disabled = false;
        } else if (isRunning && this._player.direction === "LEFT" && (anim.name !== "run-left" || anim.disabled || !anim.play)) {
            anim.name = "run-left";
            anim.play = true;
            anim.time = 0;
            anim.disabled = false;
        }
    }
}