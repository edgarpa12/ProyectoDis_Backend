import { Router } from 'express';
import { FacadeAsesor } from '../controllers/facadeAsesor';
import { FacadeJefe } from '../controllers/facadeJefe';
import { FacadeMiembros } from '../controllers/facadeMiembros';
import multer from "multer";
import path from "path";
import { saveImages } from "./helpers";

const facadeAsesor = new FacadeAsesor();
const facadeJefe = new FacadeJefe();
const facadeMiembros = new FacadeMiembros();

const routerMember = Router();


routerMember.get('/getMembers', facadeMiembros.getMembers);

routerMember.post('/getMember', facadeMiembros.getMember);

routerMember.post('/create', facadeAsesor.createMember);

routerMember.post('/changeGroup', facadeAsesor.changeGroup);

routerMember.put('/update', facadeAsesor.updateMember);

routerMember.post('/delete', facadeAsesor.deleteMember);

routerMember.get('/getMonitors', facadeAsesor.getMonitors);

routerMember.get('/getStructuresXMember', facadeMiembros.getStructuresXMember);

routerMember.post('/sendCCG', facadeMiembros.sendCCG);

routerMember.post('/uploadTest', saveImages);

export default routerMember;
