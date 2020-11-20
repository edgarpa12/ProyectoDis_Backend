import { Router } from 'express';
import { GeneralController } from '../controllers/generalController';
const generalController = GeneralController.getInstance();
const routerMember = Router();


routerMember.get('/getMembers', generalController.getMembers);

routerMember.post('/getMember', generalController.getMember);

routerMember.post('/create', generalController.createMember);

routerMember.post('/changeGroup', generalController.changeGroup);

routerMember.put('/update', generalController.updateMember);

routerMember.post('/delete', generalController.deleteMember);

routerMember.get('/getMonitors', generalController.getMonitors);

routerMember.get('/getStructuresXMember', generalController.getStructuresXMember);

export default routerMember;