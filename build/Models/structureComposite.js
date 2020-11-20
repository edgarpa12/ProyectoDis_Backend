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
exports.CompositeStructure = void 0;
var abstractComponent_1 = require("./abstractComponent");
var CompositeStructure = /** @class */ (function (_super) {
    __extends(CompositeStructure, _super);
    function CompositeStructure(pId, pName, pGroups, pMembers, pBosses) {
        if (pId === void 0) { pId = ""; }
        if (pName === void 0) { pName = ""; }
        if (pGroups === void 0) { pGroups = []; }
        if (pMembers === void 0) { pMembers = []; }
        if (pBosses === void 0) { pBosses = []; }
        var _this = _super.call(this, pId, pName) || this;
        _this.groups = pGroups;
        _this.members = pMembers;
        _this.bosses = pBosses;
        return _this;
    }
    CompositeStructure.prototype.addMember = function (pMember) {
        this.members.push(pMember);
    };
    CompositeStructure.prototype.removeMember = function () { };
    CompositeStructure.prototype.addSubGroup = function (pStructure) {
        this.groups.push(pStructure);
    };
    CompositeStructure.prototype.removeSubGroup = function () { };
    CompositeStructure.prototype.getMember = function () {
        var members = [];
        for (var i = 0; i < this.members.length; i++) {
            var member = this.members[i];
            members.push(member);
        }
        console.log("MIEMBROS+ " + members);
        return members;
    };
    CompositeStructure.prototype.getGroups = function () {
        var groups = [];
        for (var i = 0; i < this.groups.length; i++) {
            var group = this.groups[i];
            groups.push(group);
        }
        return groups;
    };
    CompositeStructure.prototype.getBosses = function () {
        var bosses = [];
        for (var i = 0; i < this.bosses.length; i++) {
            var boss = this.bosses[i];
            bosses.push(boss);
        }
        return bosses;
    };
    //Verifica si un miembro ya es parte de jefes
    CompositeStructure.prototype.isMemberInBosses = function (idMember) {
        var value = false;
        this.bosses.forEach(function (boss) {
            if (boss.id == idMember)
                value = true;
        });
        return value;
    };
    //Verifica si un usuario ya es parte de miembros  del grupo
    CompositeStructure.prototype.isMemberInMembers = function (idMember) {
        var value = false;
        this.members.forEach(function (member) {
            if (member.id == idMember)
                value = true;
        });
        return value;
    };
    return CompositeStructure;
}(abstractComponent_1.AbstractComponent));
exports.CompositeStructure = CompositeStructure;
