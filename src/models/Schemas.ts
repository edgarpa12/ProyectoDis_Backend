import * as mongoose from "mongoose";
import { Status } from "./status";
const { Schema } = mongoose;

export const memberSchema = new Schema();
memberSchema.add({
  name: { type: String, required: true },
  idOrganization: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  direction: { type: String, required: true },
  dateBegin: { type: Date, required: true, default: new Date() },
  dateEnd: { type: Date, required: true, default: new Date() },
  monitor: { type: Boolean, required: true, default: false },
  status: { type: Status, required: true, default: Status.ACTIVE },
});


const StructureSchema = new Schema();

StructureSchema.add({
  name: { type: String, required: true },
  groupNumber: { type: String, required: true, default: "" },
  members: [{ type: [String], required: true, default: [], ref: "Members" }],
  bosses: [{ type: [String], required: true, default: [], ref: "Bosses" }],
  parent: { type: Schema.Types.ObjectId, ref: "Structures" },
});

export const organizationSchema = new Schema();
organizationSchema.add({
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

export const branchSchema = new Schema();
branchSchema.add({
  idOrganization: { type: String, ref: "Organization", required: true },
  name: { type: String, required: true },
});


export let BranchSchema = mongoose.model(
  "BranchSchema",
  branchSchema,
  "Catalogue"
);

export let organizationS = mongoose.model(
  "OrganizationSchema",
  organizationSchema,
  "Organization"
);

export let structureS = mongoose.model(
  "StructureSchema",
  StructureSchema,
  "Structures"
);

export let memberS = mongoose.model("MemberSchema", memberSchema, "Members");
