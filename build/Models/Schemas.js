"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberS = exports.structureS = exports.organizationS = exports.BranchSchema = exports.branchSchema = exports.organizationSchema = exports.memberSchema = void 0;
var mongoose = __importStar(require("mongoose"));
var status_1 = require("./status");
var Schema = mongoose.Schema;
exports.memberSchema = new Schema();
exports.memberSchema.add({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    direction: { type: String, required: true },
    dateBegin: { type: Date, required: true, default: new Date() },
    dateEnd: { type: Date, required: true, default: new Date() },
    monitor: { type: Boolean, required: true, default: false },
    status: { type: status_1.Status, required: true, default: status_1.Status.ACTIVE },
});
var StructureSchema = new Schema();
StructureSchema.add({
    name: { type: String, required: true },
    members: [{ type: [String], required: true, default: [], ref: "Members" }],
    bosses: [{ type: [String], required: true, default: [], ref: "Bosses" }],
    parent: { type: Schema.Types.ObjectId, ref: "Structures" },
});
exports.organizationSchema = new Schema();
exports.organizationSchema.add({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    legalCertificate: { type: String, required: true },
    web: { type: String, required: true },
    direction: { type: String, required: true },
    phone: { type: String, required: true },
    logoName: { type: String, required: true },
    country: { type: String, required: true },
});
exports.branchSchema = new Schema();
exports.branchSchema.add({
    //_id: { type: String, required: true },
    idOrganization: { type: String, ref: "Organization" },
    name: { type: String, required: true },
});
exports.BranchSchema = mongoose.model("BranchSchema", exports.branchSchema, "Catalogue");
exports.organizationS = mongoose.model("OrganizationSchema", exports.organizationSchema, "Organization");
exports.structureS = mongoose.model("StructureSchema", StructureSchema, "Structures");
exports.memberS = mongoose.model("MemberSchema", exports.memberSchema, "Members");
