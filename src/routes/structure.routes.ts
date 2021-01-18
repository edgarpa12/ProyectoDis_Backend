import { Router } from "express";
import { FacadeAsesor } from '../controllers/facadeAsesor';
import { FacadeJefe } from '../controllers/facadeJefe';
import { FacadeMiembros } from '../controllers/facadeMiembros';
import routerMember from "./member.routes";

const facadeAsesor = new FacadeAsesor();
const facadeJefe = new FacadeJefe();
const facadeMiembros = new FacadeMiembros();
const routerStructure = Router();

routerStructure.get("/getStructures", facadeAsesor.getStructures);

routerStructure.get("/getDefaultBranches", facadeAsesor.getDefaultBranches);

routerStructure.post("/create", facadeAsesor.createStructure);

routerStructure.put("/update", facadeAsesor.updateStructure);

routerStructure.post("/delete", facadeAsesor.deleteStructure);

routerStructure.post("/getLevel", facadeAsesor.getLevelByParent);

routerStructure.post(
  "/getStructureMembers",
  facadeMiembros.getStructureMembers
);

routerStructure.post(
  "/getStructureXMember",
  facadeMiembros.getStructuresXMember
);

routerStructure.post(
  "/getStructureBosses",
  facadeMiembros.getStructureBosses
);

routerStructure.post(
  "/getStructureGroups",
  facadeJefe.getStructureGroups
);

routerStructure.post("/addMemberToGroup", facadeAsesor.addMemberToGroup);

routerStructure.post("/addBossToGroup", facadeAsesor.addBossToGroup);

routerStructure.post("/addMonitorToGroup", facadeAsesor.addMonitorToGroup);

routerStructure.post("/addDefaultBranch", facadeAsesor.addDefaultBranch);

routerStructure.post("/updateDefaultBranch", facadeAsesor.updateDefaultBranch);

routerStructure.post("/removeDefaultBranch", facadeAsesor.removeDefaultBranch);

routerStructure.post(
  "/removeMemberFromStructure",
  facadeAsesor.removeMemberFromStructure
);

routerStructure.post(
  "/removeBossFromStructure",
  facadeAsesor.removeBossFromStructure
);

routerStructure.post(
  "/removeMonitorFromGroup",
  facadeAsesor.removeMonitorFromGroup
);

routerStructure.post("/seenNews",
facadeMiembros.seenNews);

routerStructure.put("/enabledCCGs",facadeAsesor.enabledCCGs);

routerStructure.post("/getAllCCGs",facadeAsesor.getAllCCGs);

routerStructure.post('/getPath', facadeMiembros.getPath);
routerStructure.post('/getNews', facadeMiembros.getNews);
routerStructure.post('/getSeenNews', facadeMiembros.getSeenNews);

export default routerStructure;
