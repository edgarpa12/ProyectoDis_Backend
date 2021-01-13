import * as mongoose from "mongoose";
import { Status } from "./status";

const { Schema } = mongoose;

const memberSchema = new Schema();
memberSchema.add({
  name: { type: String, required: true },
  idOrganization: { type: String, ref: "Organization", required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  direction: { type: String, required: true },
  dateBegin: { type: Date, required: true, default: new Date() },
  dateEnd: { type: Date, required: true, default: new Date() },
  monitor: { type: Boolean, required: true, default: false },
  status: { type: Status, required: true, default: Status.ACTIVE },
});


const structureSchema = new Schema();

structureSchema.add({
  name: { type: String, required: true },
  groupNumber: { type: String, required: true, default: "" },
  members: [{ type: [String], required: true, default: [], ref: "Members" }],
  bosses: [{ type: [String], required: true, default: [], ref: "Bosses" }],
  parent: { type: Schema.Types.ObjectId, ref: "Structures" },
});

const organizationSchema = new Schema();
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

const branchSchema = new Schema();
branchSchema.add({
  idOrganization: { type: String, ref: "Organization", required: true },
  name: { type: String, required: true },
});

const newsSchema = new Schema();
newsSchema.add({
  from: { type: String, ref: "Members", required: true },
  to: { type: String, ref: "Structures", required: true },
  body: { type: String, required: true },
  images: { type: [String], required: true, default: [] },
  date: { type: Date, default: Date.now },
});

const ccgSchema = new Schema();
ccgSchema.add({
  idOrganization: { type: String, ref: "Organization", required: true },
  from: { type: String, ref: "Members", required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  enabled: { type: Boolean, default: true },
});

const newsHistorySchema = new Schema();
newsHistorySchema.add({
  member: { type: String, ref: "Members", required: true },
  seenNews: { type: [String], ref: "News", required: true },
});

export const branchS = mongoose.model(
  "BranchSchema",
  branchSchema,
  "Catalogue"
);

export const organizationS = mongoose.model(
  "OrganizationSchema",
  organizationSchema,
  "Organization"
);

export const structureS = mongoose.model(
  "StructureSchema",
  structureSchema,
  "Structures"
);

export const memberS = mongoose.model(
  "MemberSchema",
  memberSchema,
  "Members"
);

export const ccgS = mongoose.model(
  "CCGSchema",
  ccgSchema,
  "CCGs"
);

export const newsS = mongoose.model(
  "NewsSchema",
  newsSchema,
  "News"
);

export const newsHistoryS = mongoose.model(
  "NewsHistorySchema",
  newsHistorySchema,
  "NewsHistory"
);
