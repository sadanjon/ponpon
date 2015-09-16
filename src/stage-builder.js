import THREE from "three";
import {SpriteSheetCreator, SpriteBodyCreator, SpriteCreator} from "./sprite";

export default class StageBuilder {

    constructor() {
        this._spriteSheetCreator = new SpriteSheetCreator();
        this._spriteCreator = new SpriteCreator();
        this._spriteBodyCreator = new SpriteBodyCreator();
    }

    build(stageDefinition) {
        stageDefinition = stageDefinition || {};
        var spriteSheetsDefs = stageDefinition["spriteSheets"] || [];
        var spriteDefs = stageDefinition["sprites"] || [];
        var stage = {};
        var spriteSheetPromises = this._keyValueMapper(spriteSheetsDefs, (key, value) => {
            return this._spriteSheetCreator.create({
                id: key,
                diffusePath: value.diffusePath,
                grid: {
                    repeat: this._arrayToVector(value.grid && value.grid.repeat),
                    offset: this._arrayToVector(value.grid && value.grid.offset),
                },
                animations: value.animations,
                statics: value.statics
            });
        });

        return Promise.all(spriteSheetPromises)
        .then(spriteSheets => {
            return {
                spriteSheets: this._arrayToObject(spriteSheets)
            };
        })
        .then(stage => {
            var sprites = this._keyValueMapper(spriteDefs, (key, value) => {
                return this._spriteCreator.create({
                    id: key,
                    spriteSheet: this._findSpriteSheetOrThrow([value.spriteSheet], stage.spriteSheets),
                    width: value.width,
                    height: value.height,
                    position: this._arrayToVector(value.position),
                    zIndex: value.zIndex,
                    hidden: value.hidden,
                    spriteStatic: value.spriteStatic,
                    spriteAnimation: value.spriteAnimation,
                    spriteBody: value.spriteBody ? this._spriteBodyCreator.create(value.spriteBody) : null
                });
            });
            stage.sprites = this._arrayToObject(sprites);
            return stage;
        });
    }

    _keyValueIterator(obj, cb) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; ++i) {
            var k = ks[i];
            cb(k, obj[k]);
        }
    }

    _keyValueMapper(obj, cb) {
        var result = [];
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; ++i) {
            var k = ks[i];
            result.push(cb(k, obj[k]));
        }
        return result;
    }

    _arrayToObject(arr) {
        var result = {};
        for (var i = 0; i < arr.length; ++i) {
            var it = arr[i];
            result[it.id] = it;
        }
        return result;
    }

    _findSpriteSheetOrThrow(id, spriteSheets) {
        var result = spriteSheets[id];
        if (!result)
            throw new Error(`Could not find sprite sheet "${id}"`);
        return result;
    }

    _arrayToVector(arr) {
        if (!arr)
            return null;
        if (arr.length === 2)
            return new THREE.Vector2(arr[0], arr[1]);
        else if (arr.length === 3)
            return new THREE.Vector3(arr[0], arr[1], arr[2]);
    }
}