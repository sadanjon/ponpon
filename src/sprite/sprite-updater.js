
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
    }

    _updateSpriteTextureScale(sprite) {    
        var grid = sprite.spriteSheet.grid;
        var imageWidth = sprite.spriteSheet.diffuseTexture.image.width;
        var imageHeight = sprite.spriteSheet.diffuseTexture.image.height;
        sprite.mesh.material.setDiffuseTextureScale(grid.repeat.x / imageWidth, grid.repeat.y / imageHeight);
    }

    _updateSpriteTextureOffset(sprite) {
        if (!sprite.spriteAnimation.disabled) {
            var anim = sprite.spriteAnimation;
            var animDef = sprite.spriteSheet.animations[anim.name];
            var flipDirection = animDef.end < animDef.start;
            var numFrames = Math.abs(animDef.end - animDef.start) + 1;
            var curFrame = animDef.start + (flipDirection ? -1 : 1) * (parseInt(anim.time / (this._fpsToMspf(animDef.fps) * numFrames)) % numFrames);
            var offset = this._getOffsetFromFrame(sprite, curFrame);
            sprite.mesh.material.setDiffuseTextureOffset(offset.x, offset.y);
        } else if (sprite.spriteStatic) {
            var staticFrame = sprite.spriteSheet.statics[sprite.spriteStatic];
            var offset = this._getOffsetFromFrame(sprite, staticFrame);
            sprite.mesh.material.setDiffuseTextureOffset(offset.x, offset.y);
        }
    }

    _getOffsetFromFrame(sprite, frame) {
        var grid = sprite.spriteSheet.grid;
        var imageWidth = sprite.spriteSheet.diffuseTexture.image.width;
        var offsetRows = (grid.offset.x + (frame * grid.repeat.x)) / imageWidth;
        var offsetX = offsetRows - parseInt(offsetRows);
        var offsetY = parseInt(offsetRows);
        return {x: offsetX, y: offsetY};
    }

    _fpsToMspf(fps) {
        return 1000 * (1 / fps);
    }

}