import { Router } from "express";
import { GeneralController } from "../controllers/generalController";
const generalController = GeneralController.getInstance();
const routerStructure = Router();

routerStructure.get("/getStructures", generalController.getStructures);

routerStructure.get("/getDefaultBranches", generalController.getDefaultBranches);

routerStructure.post("/create", generalController.createStructure);

routerStructure.put("/update", generalController.updateStructure);

routerStructure.post("/delete", generalController.deleteStructure);

routerStructure.post("/getLevel", generalController.getLevelByParent);

routerStructure.post(
  "/getStructureMembers",
  generalController.getStructureMembers
);

routerStructure.post(
  "/getStructureXMember",
  generalController.getStructuresXMember
);

routerStructure.post(
  "/getStructureBosses",
  generalController.getStructureBosses
);

routerStructure.post(
  "/getStructureGroups",
  generalController.getStructureGroups
);

routerStructure.post("/addMemberToGroup", generalController.addMemberToGroup);

routerStructure.post("/addBossToGroup", generalController.addBossToGroup);

routerStructure.post("/addMonitorToGroup", generalController.addMonitorToGroup);

routerStructure.post("/addDefaultBranch", generalController.addDefaultBranch);

routerStructure.post("/updateDefaultBranch", generalController.updateDefaultBranch);

routerStructure.post("/removeDefaultBranch", generalController.removeDefaultBranch);

routerStructure.post(
  "/removeMemberFromStructure",
  generalController.removeMemberFromStructure
);

routerStructure.post(
  "/removeBossFromStructure",
  generalController.removeBossFromStructure
);

routerStructure.post(
  "/removeMonitorFromGroup",
  generalController.removeMonitorFromGroup
);
export default routerStructure;
