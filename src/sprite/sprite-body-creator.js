import THREE from "three";
import p2 from "p2";

export default class SpriteBodyCreator {
    constructor() {
    }

    create(options) {
        if (!options)
            throw new Error("No sprite body definition found");
        var shape = this._createShape(options);
        var body = this._createBody(options);
        body.addShape(shape);
        console.log(body);
        return body;
    }

    _createShape(options) {
        if (!options.shape)
            throw new Error("No shape definition in sprite body");
        var shapeOptions = Object.assign({}, options.shape);
        delete shapeOptions.type;
        switch(options.shape.type) {
            case "box":
                return new p2.Box(shapeOptions);
            default:
                throw new Error("No shape type definition in sprite body shape");
        }
    }

    _createBody(options) {
        var bodyOptions = Object.assign({}, options);
        delete bodyOptions.shape;
        return new p2.Body(bodyOptions);
    }
}