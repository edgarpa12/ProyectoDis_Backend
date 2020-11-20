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
exports.DatabaseManager = void 0;
var member_1 = require("../Models/member");
var structureComposite_1 = require("../Models/structureComposite");
var Schemas_1 = require("../Models/Schemas");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager() {
    }
    //DATABASE -> MEMORY MEMBERS
    //DB MANAGER: Cargar Miembros a memoria
    DatabaseManager.prototype.loadMembers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, members;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.memberS.find()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.getListMembers(data)];
                    case 2:
                        members = _a.sent();
                        return [2 /*return*/, members];
                }
            });
        });
    };
    //DB MANAGER: Tranforma los documentos de la BD a objetos MIEMBROS
    DatabaseManager.prototype.getListMembers = function (documents) {
        return __awaiter(this, void 0, void 0, function () {
            var members, index, document, member;
            return __generator(this, function (_a) {
                members = [];
                for (index = 0; index < documents.length; index++) {
                    document = documents[index];
                    member = new member_1.Member(document._id, document.get("name"), document.get("phone"), document.get("email"), document.get("direction"), document.get("dateBegin"), document.get("dateEnd"), document.get("monitor"), document.get("status"));
                    members.push(member);
                }
                return [2 /*return*/, members];
            });
        });
    };
    DatabaseManager.prototype.findMembers = function (members) {
        return __awaiter(this, void 0, void 0, function () {
            var membs, memoryMembers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        membs = [];
                        return [4 /*yield*/, this.loadMembers()];
                    case 1:
                        memoryMembers = _a.sent();
                        members.forEach(function (id) {
                            memoryMembers.forEach(function (member) {
                                if (member.id == id)
                                    membs.push(member);
                            });
                        });
                        return [2 /*return*/, membs];
                }
            });
        });
    };
    //END DATABASE -> MEMORY
    //DB MANAGER: MEMBER METHODS
    //DB MANAGER: Crear un miembro en la base de datos
    DatabaseManager.prototype.createMember = function (pName, pPhone, pEmail, pDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var persistantMember, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        persistantMember = new Schemas_1.memberS({
                            name: pName,
                            phone: pPhone,
                            email: pEmail,
                            direction: pDirection,
                        });
                        return [4 /*yield*/, persistantMember.save()];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    //DB MANAGER: MODIFICAR un miembro en la base de datos
    DatabaseManager.prototype.updateMember = function (pId, pUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.memberS.findByIdAndUpdate(pId, pUpdate)];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    //DB MANAGER: ELIMINAR un miembro en la base de datos
    DatabaseManager.prototype.deleteMember = function (pId) {
        return __awaiter(this, void 0, void 0, function () {
            var messsage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.memberS.findByIdAndDelete(pId)];
                    case 1:
                        messsage = _a.sent();
                        return [2 /*return*/, messsage];
                }
            });
        });
    };
    //DATABASE -> MEMORY
    DatabaseManager.prototype.loadStructures = function (pParent) {
        return __awaiter(this, void 0, void 0, function () {
            var zones, structures;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStructures(pParent)];
                    case 1:
                        zones = _a.sent();
                        return [4 /*yield*/, this.getListStructure(zones)];
                    case 2:
                        structures = _a.sent();
                        return [2 /*return*/, structures];
                }
            });
        });
    };
    DatabaseManager.prototype.getListStructure = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var structures, index, children, groups, members, bosses, objectComposite;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        structures = [];
                        if (!(data != null || data != [])) return [3 /*break*/, 7];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < data.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getStructures(data[index]._id)];
                    case 2:
                        children = _a.sent();
                        return [4 /*yield*/, this.getListStructure(children)];
                    case 3:
                        groups = _a.sent();
                        return [4 /*yield*/, this.findMembers(data[index].get("members"))];
                    case 4:
                        members = _a.sent();
                        return [4 /*yield*/, this.findMembers(data[index].get("bosses"))];
                    case 5:
                        bosses = _a.sent();
                        objectComposite = new structureComposite_1.CompositeStructure(data[index].id, data[index].get("name"), groups, members, bosses);
                        structures.push(objectComposite);
                        _a.label = 6;
                    case 6:
                        index++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, structures];
                }
            });
        });
    };
    //END DATABASE -> MEMORY
    //DB MANAGER: STRUCTURES METHODS
    //DB MANAGER: CREA una structure en la  base de datos
    DatabaseManager.prototype.createStructure = function (pName, pParent) {
        return __awaiter(this, void 0, void 0, function () {
            var searchedStrucutre, persistantStructure, responseDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchedStrucutre = Schemas_1.structureS.find({ name: pName });
                        return [4 /*yield*/, searchedStrucutre];
                    case 1:
                        if (!((_a.sent()).length == 0)) return [3 /*break*/, 3];
                        persistantStructure = new Schemas_1.structureS({
                            name: pName,
                            parent: pParent,
                        });
                        return [4 /*yield*/, persistantStructure.save()];
                    case 2:
                        responseDB = _a.sent();
                        return [2 /*return*/, responseDB];
                    case 3: return [2 /*return*/, { message: "Already exists a structure with this name: " + pName }];
                }
            });
        });
    };
    //DB MANAGER: OBTIENE una structure en la  base de datos
    DatabaseManager.prototype.getStructure = function (pId, pParent) {
        return __awaiter(this, void 0, void 0, function () {
            var persistantStructure;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.structureS.findOne({
                            id: pId,
                            parent: pParent,
                        })];
                    case 1:
                        persistantStructure = _a.sent();
                        return [2 /*return*/, persistantStructure];
                }
            });
        });
    };
    //DB MANAGER: OBTIENE una structure en la  base de datos
    DatabaseManager.prototype.getStructures = function (pParent) {
        return __awaiter(this, void 0, void 0, function () {
            var structures;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.structureS.find({ parent: pParent })];
                    case 1:
                        structures = _a.sent();
                        return [2 /*return*/, structures];
                }
            });
        });
    };
    //DB MANAGER: MODIFICA una structure en la  base de datos
    DatabaseManager.prototype.updateStructure = function (pId, pUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var name, searchedStrucutre, responseDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = Object.values(pUpdate)[1] //Obtiene el nuevo nombre
                        ;
                        console.log(pId);
                        searchedStrucutre = Schemas_1.structureS.find({ name: name });
                        return [4 /*yield*/, searchedStrucutre];
                    case 1:
                        if (!((_a.sent()).length == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Schemas_1.structureS.findByIdAndUpdate(pId, pUpdate)];
                    case 2:
                        responseDB = _a.sent();
                        console.log("AFTER UPDATE");
                        return [2 /*return*/, responseDB];
                    case 3: return [2 /*return*/, { message: "Already exists a structure with this name: " + name }];
                }
            });
        });
    };
    //DB MANAGER: ELIMINA una structure en la  base de datos
    DatabaseManager.prototype.deleteStructure = function (pId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, message;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStructures(pId)];
                    case 1:
                        data = _a.sent();
                        if (data != []) {
                            data.forEach(function (structure) {
                                return _this.deleteStructure(structure._id);
                            });
                        }
                        return [4 /*yield*/, Schemas_1.structureS.findByIdAndDelete(pId)];
                    case 2:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    //DB MANAGER: Devuelve los hijos de una estructura padre
    DatabaseManager.prototype.findLevel = function (pIdParent) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.structureS.find({ parent: pIdParent })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    //DATABASE -> MEMORY ORGANIZATION
    //DB MANAGER: ORGANIZATION METHODS
    // Create Organization
    DatabaseManager.prototype.createOrganization = function (pName, pLegalCertificate, pWeb, pDirection, pPhone, pLogoName, pCountry, pEmail, pPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var persistantOrganization, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        persistantOrganization = new Schemas_1.organizationS({
                            name: pName,
                            legalCertificate: pLegalCertificate,
                            web: pWeb,
                            direction: pDirection,
                            phone: pPhone,
                            logoName: pLogoName,
                            country: pCountry,
                            email: pEmail,
                            password: pPassword,
                            branches: [],
                        });
                        return [4 /*yield*/, persistantOrganization.save()];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    DatabaseManager.prototype.validateOrganization = function (pEmail, pPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var response, organization, persistantBranches, branches_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = [];
                        return [4 /*yield*/, Schemas_1.organizationS.findOne({
                                email: pEmail,
                                password: pPassword,
                            })];
                    case 1:
                        organization = _a.sent();
                        if (!(organization != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Schemas_1.BranchSchema.find({
                                idOrganization: organization._id,
                            })];
                    case 2:
                        persistantBranches = _a.sent();
                        branches_1 = [];
                        persistantBranches.forEach(function (branch) {
                            branches_1.push(branch.get("name"));
                        });
                        response = [
                            organization._id,
                            organization.get("legalCertificate"),
                            organization.get("web"),
                            organization.get("direction"),
                            organization.get("phone"),
                            organization.get("logoName"),
                            organization.get("country"),
                            organization.get("email"),
                            organization.get("password"),
                            branches_1,
                        ];
                        _a.label = 3;
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    //END DATABASE -> MEMORY ORGANIZATION
    //OTHER FUNCTIONS
    DatabaseManager.prototype.addMemberToGroup = function (pIdMember, pIdStructure) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.structureS.updateOne({ _id: pIdStructure }, { $push: { members: pIdMember } })];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    DatabaseManager.prototype.removeToGroup = function (pSearch, pIdStructure) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.structureS.updateOne({ _id: pIdStructure }, { $pull: pSearch })];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    DatabaseManager.prototype.addBossToGroup = function (pIdMember, pIdStructure) {
        return __awaiter(this, void 0, void 0, function () {
            var message, struct, idParent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas_1.structureS.updateOne({ _id: pIdStructure }, { $push: { bosses: pIdMember } })];
                    case 1:
                        message = _a.sent();
                        return [4 /*yield*/, Schemas_1.structureS.findOne({ _id: pIdStructure })];
                    case 2:
                        struct = _a.sent();
                        idParent = struct === null || struct === void 0 ? void 0 : struct.toJSON().parent;
                        this.addMemberToGroup(pIdMember, idParent);
                        return [2 /*return*/, message];
                }
            });
        });
    };
    //Catalogo
    DatabaseManager.prototype.addDefaultBranch = function (pIdOrganization, pName) {
        return __awaiter(this, void 0, void 0, function () {
            var persistantDefaultBranch, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        persistantDefaultBranch = new Schemas_1.BranchSchema({
                            idOrganization: pIdOrganization,
                            name: pName,
                        });
                        console.log(persistantDefaultBranch);
                        return [4 /*yield*/, persistantDefaultBranch.save()];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    return DatabaseManager;
}());
exports.DatabaseManager = DatabaseManager;
