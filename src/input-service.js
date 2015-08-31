
export default class InputService {

    constructor() {
        this._keys = {};
        this._map = InputService.Map;
        this._revMap = this._createReverseMap();
        this._counter = 1;
        this._listeners = {};
        window.addEventListener("keyup", e => this._onKeyUp(e));
        window.addEventListener("keydown", e => this._onKeyDown(e));
    }

    addListener(listener) {
        var id = this._counter++;
        this._listeners[id] = listener;
        return id;
    }

    removeListener(id) {
        delete this._listeners[id];
    }

    isMappingPressed(name) {
        var m = this._revMap[name] || [];
        for (var i = 0; i < m.length; ++i)
            if (this._keys[m[i]])
                return true;
        return false;
    }

    isPressed(name) {
        return !!this._keys[name];
    }

    _onKeyDown(e) {
        var k = this._getKey(e)
        if (!k)
            return;
        if (this._keys[k]) 
            return;
        this._invokeListeners(k, true);
        this._keys[k] = true;
    }

    _onKeyUp(e) {
        var k = this._getKey(e)
        if (!k)
            return;
        this._invokeListeners(k, false);
        this._keys[k] = false;
    }

    _invokeListeners(key, isPressed) {
        var ids = Object.keys(this._listeners);
        for (var i = 0; i < ids.length; ++i) {
            this._listeners[ids[i]](key, this._getMappedKey(key), isPressed);
        }
    }

    _getMappedKey(key) {
        var m = this._map[key];
        if (!m)
            return key;
        return m;
    }

    _getKey(event) {
        var code = event.code || event.keyCode;
        if (code === "ArrowUp" || code === 38)
            return "UP";
        else if (code === "ArrowDown" || code === 40)
            return "DOWN";
        else if (code === "ArrowLeft" || code === 37)
            return "LEFT";
        else if (code === "ArrowRight" || code === 39)
            return "RIGHT";
        else if (code === "KeyA" || code === 65)
            return "A";
        else if (code === "KeyS" || code === 83)
            return "S";
        else if (code === "KeyD" || code === 68)
            return "D";
        else if (code === "KeyW" || code === 87)
            return "W";
    }

    _createReverseMap() {
        var result = {};
        var ks = Object.keys(InputService.Map);
        for (var i = 0; i < ks.length; ++i) {
            var k = ks[i];
            var v = InputService.Map[k];
            if (result[v])
                result[v].push(k);
            else
                result[v] = [k];
        }
        return result;
    }
}

InputService.Map = {
    "W": "UP",
    "UP": "UP",
    "S": "DOWN",
    "DOWN": "DOWN",
    "D": "RIGHT",
    "RIGHT": "RIGHT",
    "A": "LEFT",
    "LEFT": "LEFT",
};