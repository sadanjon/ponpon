import THREE from "three";

export default class PlayerUpdater {

    constructor(inputService, player) {
        this._inputService = inputService;
        this._player = player;
        this._listenerId = null;
        this._runVelocity = 0.0075;
    }

    startListening() {
        this._listenerId = this._inputService.addListener((key, mappedKey, isPressed) => {
            if (mappedKey === "UP" && isPressed && !this._player.isInTheAir) {
                this._player.velocity.y = 0.04;
                this._player.isInTheAir = true;
            }
        });
    }

    stopListening() {
        this._inputService.removeListener(this._listenerId);
    }

    update(dt) {
        this._updatePlayer(dt);
        this._updatePlayerSpriteAnimation();
        this._updatePlayerSpritePosition();
    }

    _updatePlayer(dt) {
        if (this._inputService.isMappingPressed("LEFT")) {
            this._player.direction = "LEFT";
            this._player.velocity.x = -this._runVelocity;
        } else if (this._inputService.isMappingPressed("RIGHT")) {
            this._player.direction = "RIGHT";
            this._player.velocity.x = this._runVelocity;
        } else {
            this._player.velocity.x = 0;
        }

        this._updatePlayerPosition(dt);
        this._detectCollision();
    }

    _updatePlayerPosition(dt) {
         var d = new THREE.Vector2();

        d.x = this._player.velocity.x * dt;
        d.y = this._player.velocity.y * dt / 2;

        if (this._player.isInTheAir) 
            this._player.velocity.y += -0.0001 * dt;

        d.y = this._player.velocity.y * dt / 2;

        this._player.position.x += d.x;
        this._player.position.y += d.y;
    }

    _detectCollision() {
        if (this._player.position.y < 0.0001) {
            this._player.velocity.y = 0;
            this._player.isInTheAir = false;
        }
    }

    _updatePlayerSpriteAnimation() {
        var anim = this._player.sprite.spriteAnimation;
        var isRunning = Math.abs(this._player.velocity.x) > 0;
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

    _updatePlayerSpritePosition() {
        this._player.sprite.position.copy(this._player.position);
    }
}