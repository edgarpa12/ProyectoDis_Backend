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
exports.GeneralController = void 0;
var organization_1 = require("./organization");
var GeneralController = /** @class */ (function () {
    function GeneralController() {
    }
    GeneralController.getInstance = function () {
        if (!GeneralController.instance) {
            GeneralController.instance = new GeneralController();
        }
        return GeneralController.instance;
    };
    //Members Functions
    GeneralController.prototype.getMembers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().getMembers()];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, res.json(message)];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_1.toString(),
                                data: null,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Recibe id del miembro a buscar
    GeneralController.prototype.getMember = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUser = req.body.idUser;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().readMember(idUser)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_2.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.createMember = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, phone, email, direction, message, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, phone = _a.phone, email = _a.email, direction = _a.direction;
                        console.log("hola");
                        console.log(organization_1.Organization.getInstance());
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().createMember(name, phone, email, direction)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_3 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_3.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.updateMember = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, data, message, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, data = _a.data;
                        console.log(req.body);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().updateMember(id, data)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_4 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_4.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.deleteMember = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().deleteMember(id)];
                    case 2:
                        message = _a.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_5.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.changeGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idUser, idOldGroup, ids, response, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idUser = _a.idUser, idOldGroup = _a.idOldGroup, ids = _a.ids;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().changeGroup(idUser, idOldGroup, ids)];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                    case 3:
                        err_6 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_6.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getMonitors = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().getMonitors()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_7 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Structure
    GeneralController.prototype.createStructure = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, idParent, message, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, idParent = _a.idParent;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().createStructure(name, idParent)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_8 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_8.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.updateStructure = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, data, message, err_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, _id = _a._id, data = _a.data;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().updateStructure(_id, data)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_9 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_9.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.deleteStructure = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().deleteStructure(id)];
                    case 2:
                        message = _a.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_10 = _a.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_10.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getStructures = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().getStructures()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_11 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getLevelByParent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idParent, response, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idParent = req.body.parent;
                        return [4 /*yield*/, organization_1.Organization.getInstance().findLevel(idParent)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_12 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.signIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, message, err_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().signIn(email, password)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_13 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_13.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, legalCertificate, web, direction, phone, logoName, country, email, password, message, err_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, legalCertificate = _a.legalCertificate, web = _a.web, direction = _a.direction, phone = _a.phone, logoName = _a.logoName, country = _a.country, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, organization_1.Organization.getInstance().signUp(name, legalCertificate, web, direction, phone, logoName, country, email, password)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, res.json(message)];
                    case 3:
                        err_14 = _b.sent();
                        return [2 /*return*/, res.status(500).send({
                                success: false,
                                message: err_14.toString(),
                                data: null,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getStructureMembers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, response, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ids = req.body.ids;
                        return [4 /*yield*/, organization_1.Organization.getInstance().getStructureMembers(ids)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_15 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getStructureBosses = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, response, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ids = req.body.ids;
                        return [4 /*yield*/, organization_1.Organization.getInstance().getStructureBosses(ids)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_16 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getStructureGroups = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, response, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ids = req.body.ids;
                        return [4 /*yield*/, organization_1.Organization.getInstance().getStructureGroups(ids)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_17 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.getStructuresXMember = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser, response, err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idUser = req.body.idUser;
                        return [4 /*yield*/, organization_1.Organization.getInstance().getStructuresXMember(idUser)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_18 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.addMemberToGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idMember, ids, response, err_19;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, idMember = _a.idMember, ids = _a.ids;
                        return [4 /*yield*/, organization_1.Organization.getInstance().addMemberToGroup(idMember, ids)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_19 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.addBossToGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idBoss, ids, response, err_20;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, idBoss = _a.idBoss, ids = _a.ids;
                        return [4 /*yield*/, organization_1.Organization.getInstance().addBossToGroup(idBoss, ids)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_20 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.removeMemberFromStructure = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idMember, idGroup, response, err_21;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, idMember = _a.idMember, idGroup = _a.idGroup;
                        return [4 /*yield*/, organization_1.Organization.getInstance().removeMemberFromStructure(idMember, idGroup)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_21 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GeneralController.prototype.removeBossFromStructure = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idMember, idBranch, idGroup, response, err_22;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, idMember = _a.idMember, idBranch = _a.idBranch, idGroup = _a.idGroup;
                        return [4 /*yield*/, organization_1.Organization.getInstance().removeBossFromStructure(idMember, idBranch, idGroup)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_22 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //CATALOGO
    GeneralController.prototype.addDefaultBranch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idOrganization, name, response, err_23;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, idOrganization = _a.idOrganization, name = _a.name;
                        return [4 /*yield*/, organization_1.Organization.getInstance().addDefaultBranch(idOrganization, name)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        err_23 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GeneralController;
}());
exports.GeneralController = GeneralController;
