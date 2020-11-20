"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
var abstractComponent_1 = require("./abstractComponent");
var status_1 = require("./status");
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(pId, pName, pPhone, pEmail, pDirection, pDateBegin, pDateEnd, pMonitor, pStatus) {
        if (pDateBegin === void 0) { pDateBegin = new Date(); }
        if (pDateEnd === void 0) { pDateEnd = new Date(); }
        if (pMonitor === void 0) { pMonitor = false; }
        if (pStatus === void 0) { pStatus = status_1.Status.ACTIVE; }
        var _this = _super.call(this, pId, pName) || this;
        _this.phone = pPhone;
        _this.email = pEmail;
        _this.direction = pDirection;
        _this.dateBegin = pDateBegin;
        _this.dateEnd = pDateEnd;
        _this.monitor = pMonitor;
        _this.status = pStatus;
        return _this;
    }
    Member.prototype.getMember = function () {
        return [this];
    };
    return Member;
}(abstractComponent_1.AbstractComponent));
exports.Member = Member;
