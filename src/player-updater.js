
export default class PlayerUpdater {

    constructor(inputService, player) {
        this._inputService = inputService;
        this._player = player;
        this._listenerId = null;
        this._runVelocity = 0.0075;
    }

    startListening() {
        this._listenerId = this._inputService.addListener((key, isPressed) => {
        });
    }

    stopListening() {
        this._inputService.removeListener(this._listenerId);
    }

    update(dt) {
        this._updatePlayer();
        this._updatePlayerSpriteAnimation();
        this._updatePlayerSpritePosition(dt);
    }

    _updatePlayer() {
        if (this._inputService.isPressed("LEFT")) {
            this._player.direction = "LEFT";
            this._player.velocity.set(-this._runVelocity, 0);
        } else if (this._inputService.isPressed("RIGHT")) {
            this._player.direction = "RIGHT";
            this._player.velocity.set(this._runVelocity, 0);
        } else {
            this._player.velocity.set(0, 0);
        }
    }

    _updatePlayerSpriteAnimation() {
        var anim = this._player.sprite.spriteAnimation;
        var isRunning = this._player.velocity.length() > 0;
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

    _updatePlayerSpritePosition(dt) {
        var isRunning = this._player.velocity.length() > 0;
        if (!isRunning)
            return;
        var v = this._player.velocity.clone().multiplyScalar(dt);
        var p = this._player.sprite.position;
        this._player.sprite.position.set(p.x + v.x, p.y + v.y, p.z);
    }
}