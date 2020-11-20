"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
var structureManager_1 = require("./structureManager");
var memberManager_1 = require("./memberManager");
var databaseManager_1 = require("./databaseManager");
var Organization = /** @class */ (function () {
    function Organization(pId, pName, pLegalCertificate, pWeb, pDirection, pPhone, pLogoName, pCountry, pEmail, pPassword) {
        if (pId === void 0) { pId = ""; }
        if (pName === void 0) { pName = ""; }
        if (pLegalCertificate === void 0) { pLegalCertificate = ""; }
        if (pWeb === void 0) { pWeb = ""; }
        if (pDirection === void 0) { pDirection = ""; }
        if (pPhone === void 0) { pPhone = ""; }
        if (pLogoName === void 0) { pLogoName = ""; }
        if (pCountry === void 0) { pCountry = ""; }
        if (pEmail === void 0) { pEmail = ""; }
        if (pPassword === void 0) { pPassword = ""; }
        this.id = pId;
        this.name = pName;
        this.legalCertificate = pLegalCertificate;
        this.web = pWeb;
        this.direction = pDirection;
        this.phone = pPhone;
        this.logoName = pLogoName;
        this.country = pCountry;
        this.email = pEmail;
        this.password = pPassword;
        this.structureM = new structureManager_1.StructureManager();
        this.memberM = new memberManager_1.MemberManager();
        this.databaseM = new databaseManager_1.DatabaseManager();
    }
    Organization.getInstance = function () {
        if (!Organization.instance) {
            Organization.instance = new Organization();
        }
        return Organization.instance;
    };
    //Member Methods
    // CRUD Members
    Organization.prototype.createMember = function (pName, pPhone, pEmail, pDirection) {
        var response = this.memberM.create(pName, pPhone, pEmail, pDirection);
        this.memberM.loadMembers();
        return response;
    };
    Organization.prototype.readMember = function (pIdUser) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memberM.loadMembers()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.memberM.read(pIdUser)];
                    case 2:
                        response = _a.sent();
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Organization.prototype.updateMember = function (pId, pData) {
        var response = this.memberM.update(pId, pData);
        this.memberM.loadMembers();
        return response;
    };
    Organization.prototype.deleteMember = function (pId) {
        var response = this.memberM.delete(pId);
        this.memberM.loadMembers();
        return response;
    };
    Organization.prototype.getMembers = function () {
        this.memberM.loadMembers();
        return this.memberM.getMembers();
    };
    Organization.prototype.getMonitors = function () {
        this.memberM.loadMembers();
        return this.memberM.getMonitors();
    };
    // Structures Methods
    // todo
    Organization.prototype.createStructure = function (pName, pIdParent) {
        return this.structureM.create(pName, pIdParent);
    };
    Organization.prototype.getStructures = function () {
        return __awaiter(this, void 0, void 0, function () {
            var responseDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.structureM.loadStructures(this.id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.structureM.getStructures()];
                    case 2:
                        responseDB = _a.sent();
                        return [2 /*return*/, responseDB];
                }
            });
        });
    };
    Organization.prototype.updateStructure = function (pId, pIdParent) {
        return this.structureM.update(pId, pIdParent);
    };
    Organization.prototype.deleteStructure = function (pId) {
        return this.structureM.delete(pId);
    };
    Organization.prototype.changeGroup = function (pIdMember, pIdOldGroup, pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var responseRemove, responseAdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.structureM.removeMemberFromStructure(pIdMember, pIdOldGroup)];
                    case 1:
                        responseRemove = _a.sent();
                        console.log(responseRemove);
                        return [4 /*yield*/, this.structureM.addMemberToGroup(pIdMember, pIds)];
                    case 2:
                        responseAdd = _a.sent();
                        console.log(responseAdd);
                        return [2 /*return*/, responseAdd];
                }
            });
        });
    };
    Organization.prototype.findLevel = function (pIdParent) {
        return this.structureM.findLevel(pIdParent);
    };
    Organization.prototype.signUp = function (pName, pLegalCertificate, pWeb, pDirection, pPhone, pLogoName, pCountry, pEmail, pPassword) {
        return this.databaseM.createOrganization(pName, pLegalCertificate, pWeb, pDirection, pPhone, pLogoName, pCountry, pEmail, pPassword);
    };
    Organization.prototype.signIn = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var organization;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.databaseM.validateOrganization(email, password)];
                    case 1:
                        organization = _a.sent();
                        if (organization != []) {
                            this.structureM.setIdOrganization(organization[0]); //Referencia al id
                            this.loadData(organization);
                            return [2 /*return*/, organization];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Organization.prototype.loadData = function (data) {
        this.id = data[0];
        this.legalCertificate = data[1];
        this.web = data[2];
        this.direction = data[3];
        this.phone = data[4];
        this.logoName = data[5];
        this.country = data[6];
        this.email = data[7];
        this.password = data[8];
    };
    Organization.prototype.getStructureMembers = function (pIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memberM.loadMembers()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.structureM.getStructureMembers(pIds)];
                }
            });
        });
    };
    Organization.prototype.getStructureBosses = function (pIds) {
        this.memberM.loadMembers();
        return this.structureM.getStructureBosses(pIds);
    };
    Organization.prototype.getStructureGroups = function (pIds) {
        this.memberM.loadMembers();
        return this.structureM.getStructureGroups(pIds);
    };
    Organization.prototype.getStructuresXMember = function (idUser) {
        this.structureM.loadStructures(this.id);
        this.structureM.getStructuresXMember(idUser, this.structureM.getStructures());
    };
    Organization.prototype.addMemberToGroup = function (pIdMember, pIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.structureM.loadStructures(this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.structureM.addMemberToGroup(pIdMember, pIds)];
                }
            });
        });
    };
    Organization.prototype.removeMemberFromStructure = function (pIdMember, pIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.structureM.loadStructures(this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.structureM.removeMemberFromStructure(pIdMember, pIds)];
                }
            });
        });
    };
    Organization.prototype.removeBossFromStructure = function (pIdMember, pIdZone, pIdGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.structureM.loadStructures(this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.structureM.removeBossFromStructure(pIdMember, pIdZone, pIdGroup)];
                }
            });
        });
    };
    Organization.prototype.addBossToGroup = function (pIdMember, pIds) {
        return this.structureM.addBossToGroup(pIdMember, pIds);
    };
    //CATALOGO
    Organization.prototype.addDefaultBranch = function (pIdOrganization, pName) {
        return this.databaseM.addDefaultBranch(pIdOrganization, pName);
    };
    return Organization;
}());
exports.Organization = Organization;
