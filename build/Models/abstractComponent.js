"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractComponent = void 0;
var AbstractComponent = /** @class */ (function () {
    function AbstractComponent(id, name) {
        if (id === void 0) { id = ""; }
        if (name === void 0) { name = ""; }
        this.id = id;
        this.name = name;
    }
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
