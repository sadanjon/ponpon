
export default class SpriteUpdater {

    update(sprite, dt) {
        if (sprite.spriteBody) {
            sprite.position.x = sprite.spriteBody.position[0];
            sprite.position.y = sprite.spriteBody.position[1];
        }
        sprite.mesh.position.x = sprite.position.x;
        sprite.mesh.position.y = sprite.position.y;
        sprite.mesh.position.z = sprite.zIndex;
        sprite.mesh.scale.set(sprite.width, sprite.height, 1);
        sprite.mesh.visible = !sprite.hidden;
        this._updateSpriteTextureScale(sprite)
        this._updateSpriteTextureOffset(sprite);
        if (sprite.spriteAnimation && sprite.spriteAnimation.play)
            sprite.spriteAnimation.time += dt;
        sprite.mesh.material.setAlpha(sprite.alpha);
    }

    _updateSpriteTextureScale(sprite) {    
        var grid = sprite.spriteSheet.grid;
        var imageWidth = sprite.spriteSheet.diffuseTexture.image.width;
        var imageHeight = sprite.spriteSheet.diffuseTexture.image.height;
        sprite.mesh.material.setDiffuseTextureScale(grid.repeat.x / imageWidth, grid.repeat.y / imageHeight);
    }

    _updateSpriteTextureOffset(sprite) {
        if (sprite.spriteAnimation && !sprite.spriteAnimation.disabled) {
            if (sprite.id !== "keen")
                debugger;
            var anim = sprite.spriteAnimation;
            var animDef = sprite.spriteSheet.animations[anim.name];
            var curFrame = this._getFrameNumber(anim, animDef);
            var offset = this._getOffsetFromFrame(sprite, curFrame);
            sprite.mesh.material.setDiffuseTextureOffset(offset.x, offset.y);
        } else if (sprite.spriteStatic && !sprite.spriteStatic.disabled) {
            var staticFrame = sprite.spriteSheet.statics[sprite.spriteStatic];
            var offset = this._getOffsetFromFrame(sprite, staticFrame);
            sprite.mesh.material.setDiffuseTextureOffset(offset.x, offset.y);
        } else if (sprite.spriteFrame) {
            var offset = this._getOffsetFromFrame(sprite, sprite.spriteFrame);
            sprite.mesh.material.setDiffuseTextureOffset(offset.x, offset.y);
        }
    }

    _getFrameNumber(anim, animDef) {
        var flipDirection = animDef.end < animDef.start;
        return animDef.start + (flipDirection ? -1 : 1) * this._getRelativeFrameNumber(anim, animDef);
    }

    _getRelativeFrameNumber(anim, animDef) {
        var numFrames = Math.abs(animDef.end - animDef.start) + 1;
        var frameNumber = parseInt(anim.time / (this._fpsToMspf(animDef.fps) * numFrames));
        if (anim.repeat)
            return frameNumber % numFrames;
        else if (frameNumber >= numFrames)
            return numFrames - 1;
        else
            return frameNumber;
    }

    _getOffsetFromFrame(sprite, frame) {
        var grid = sprite.spriteSheet.grid;
        var imageWidth = sprite.spriteSheet.diffuseTexture.image.width;
        var imageHeight = sprite.spriteSheet.diffuseTexture.image.height;
        var offsetRows = (grid.offset.x + (frame * grid.repeat.x)) / imageWidth;
        var offsetX = offsetRows - parseInt(offsetRows);
        var xxx = parseInt(imageHeight / grid.repeat.y) - parseInt(offsetRows) - 1;
        var offsetY = (xxx * grid.repeat.y) / imageHeight;
        return { x: offsetX, y: offsetY };
    }

    _fpsToMspf(fps) {
        return 1000 * (1 / fps);
    }

}