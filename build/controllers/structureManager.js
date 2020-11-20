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
exports.StructureManager = void 0;
var structureComposite_1 = require("../Models/structureComposite");
var databaseManager_1 = require("./databaseManager");
var StructureManager = /** @class */ (function () {
    function StructureManager() {
        //STRUCTURE MANAGER Attributes
        this.structures = [];
        this.databaseManager = new databaseManager_1.DatabaseManager();
        //El structure manager lleva el id de la organizacion para actualizar la info en memoria por cada llamada a base de datos
        this.idOrganization = "";
    }
    StructureManager.prototype.getStructures = function () {
        return this.structures;
    };
    StructureManager.prototype.setIdOrganization = function (id) {
        this.idOrganization = id;
        console.log("EL ID DEL STRCTURE MANAGER ES: " + this.idOrganization);
        this.loadStructures(this.idOrganization);
    };
    //Retorna una estructura en base a su jerarquia
    StructureManager.prototype.getOneStructure = function (pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var structsMEM, compositeFound, id;
            return __generator(this, function (_a) {
                structsMEM = this.getStructures();
                compositeFound = new structureComposite_1.CompositeStructure();
                pIds.reverse();
                while (pIds.length > 0) {
                    id = pIds.pop();
                    compositeFound = this.findStructure(id, structsMEM);
                    structsMEM = compositeFound.groups;
                }
                console.log(compositeFound);
                return [2 /*return*/, compositeFound];
            });
        });
    };
    StructureManager.prototype.read = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getStructures().forEach(function (structure) {
                    if (structure.id == args[0])
                        return structure;
                });
                return [2 /*return*/];
            });
        });
    };
    StructureManager.prototype.findStructure = function (pId, pList) {
        var match = new structureComposite_1.CompositeStructure();
        pList.forEach(function (structure) {
            if (structure.id == pId) {
                match = structure;
                return;
            }
        });
        return match;
    };
    StructureManager.prototype.findMember = function (pId, pList) {
        var match = new structureComposite_1.CompositeStructure();
        pList.forEach(function (member) {
            if (member.id == pId) {
                match = member;
                return;
            }
        });
        return match;
    };
    // BASE DE DATOS
    StructureManager.prototype.loadStructures = function (pParent) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.databaseManager.loadStructures(pParent)];
                    case 1:
                        _a.structures = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StructureManager.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = this.databaseManager.createStructure(args[0], args[1]);
                this.databaseManager.loadStructures(this.idOrganization);
                return [2 /*return*/, message];
            });
        });
    };
    StructureManager.prototype.update = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = this.databaseManager.updateStructure(args[0], args[1]);
                this.databaseManager.loadStructures(this.idOrganization);
                return [2 /*return*/, message];
            });
        });
    };
    StructureManager.prototype.delete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = this.databaseManager.deleteStructure(args[0]);
                this.databaseManager.loadStructures(this.idOrganization);
                return [2 /*return*/, message];
            });
        });
    };
    StructureManager.prototype.findLevel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.databaseManager.findLevel(args[0])];
            });
        });
    };
    //STRUCTURE MANAGER: MEMORIA
    //Retorna los miembros de una estructura
    StructureManager.prototype.getStructureMembers = function (pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var structure, members;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneStructure(pIds)];
                    case 1:
                        structure = _a.sent();
                        console.log("ESTRUCTURA" + structure);
                        members = structure.getMember();
                        return [2 /*return*/, members];
                }
            });
        });
    };
    //Retorna los jefes de una estructura
    StructureManager.prototype.getStructureBosses = function (pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var structure, bosses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneStructure(pIds)];
                    case 1:
                        structure = _a.sent();
                        bosses = structure.getBosses();
                        console.log(bosses);
                        return [2 /*return*/, bosses];
                }
            });
        });
    };
    //Retorna los grupos de una estructura
    StructureManager.prototype.getStructureGroups = function (pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var structure, groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneStructure(pIds)];
                    case 1:
                        structure = _a.sent();
                        groups = structure.getGroups();
                        return [2 /*return*/, groups];
                }
            });
        });
    };
    StructureManager.prototype.addMemberToGroup = function (pIdMember, pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var pIdsBranch, branch, group, index, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pIdsBranch = pIds.slice(0, pIds.length - 1);
                        return [4 /*yield*/, this.getOneStructure(pIdsBranch)];
                    case 1:
                        branch = _a.sent();
                        group = new structureComposite_1.CompositeStructure();
                        for (index = 0; index < branch.groups.length; index++) {
                            group = branch.groups[index];
                            //Valida si ya es un miembro
                            if (group.isMemberInMembers(pIdMember)) {
                                return [2 /*return*/, { message: "This user is already a member in this structure" }];
                            }
                        }
                        message = this.databaseManager.addMemberToGroup(pIdMember, group.id);
                        this.loadStructures(this.idOrganization);
                        return [2 /*return*/, message];
                }
            });
        });
    };
    StructureManager.prototype.removeMemberFromStructure = function (pIdMember, pIdGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var search, message;
            return __generator(this, function (_a) {
                search = { members: pIdMember };
                message = this.databaseManager.removeToGroup(search, pIdGroup);
                this.loadStructures(this.idOrganization);
                return [2 /*return*/, message];
            });
        });
    };
    StructureManager.prototype.removeBossFromStructure = function (pIdMember, pIdBranch, pIdGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var searchB, searchM, message;
            return __generator(this, function (_a) {
                searchB = { bosses: pIdMember };
                searchM = { members: pIdMember };
                this.databaseManager.removeToGroup(searchB, pIdGroup);
                message = this.databaseManager.removeToGroup(searchM, pIdBranch);
                this.loadStructures(this.idOrganization);
                return [2 /*return*/, message];
            });
        });
    };
    StructureManager.prototype.addBossToGroup = function (pIdMember, pIds) {
        return __awaiter(this, void 0, void 0, function () {
            var structure, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneStructure(pIds)];
                    case 1:
                        structure = _a.sent();
                        //Valida si ya es un jefe
                        if (structure.isMemberInBosses(pIdMember)) {
                            return [2 /*return*/, { message: "This member is already a boss for this structure" }];
                        }
                        //Valida si ya hay más de un dos jefes
                        if (structure.bosses.length >= 2) {
                            return [2 /*return*/, { message: "Max of bosses is 2" }];
                        }
                        message = this.databaseManager.addBossToGroup(pIdMember, structure.id);
                        this.loadStructures(this.idOrganization);
                        return [2 /*return*/, message];
                }
            });
        });
    };
    StructureManager.prototype.getStructuresXMember = function (pIdMember, pStructures) {
        return __awaiter(this, void 0, void 0, function () {
            var structures, index, structure;
            return __generator(this, function (_a) {
                structures = [];
                if (pStructures != []) {
                    for (index = 0; index < pStructures.length; index++) {
                        structure = pStructures[0];
                        if (structure.isMemberInMembers(pIdMember)) {
                            structures.push(structure);
                        }
                        else
                            return [2 /*return*/, this.getStructuresXMember(pIdMember, structure.groups)];
                    }
                }
                return [2 /*return*/, structures];
            });
        });
    };
    return StructureManager;
}());
exports.StructureManager = StructureManager;
