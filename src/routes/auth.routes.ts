import { Router } from "express";
import { GeneralController } from '../controllers/generalController';
import { FacadeAsesor } from '../controllers/facadeAsesor';

const generalController = GeneralController.getInstance();
const facadeAsesor = new FacadeAsesor();
const routerAuth = Router();

routerAuth.post("/signin", generalController.signIn);

routerAuth.post("/signup", facadeAsesor.signUp);

routerAuth.get("/signout", generalController.signOut);

export default routerAuth;
