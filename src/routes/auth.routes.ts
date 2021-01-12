import { Router } from "express";
import { GeneralController } from '../controllers/generalController';
const generalController = GeneralController.getInstance();
const routerAuth = Router();
routerAuth.post("/signin", generalController.signIn);

routerAuth.post("/signup", generalController.signUp);

routerAuth.get("/signout", generalController.signOut);

export default routerAuth;
