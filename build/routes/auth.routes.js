"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var generalController_1 = require("../controllers/generalController");
var generalController = generalController_1.GeneralController.getInstance();
var routerAuth = express_1.Router();
routerAuth.post("/signin", generalController.signIn);
routerAuth.post("/signup", generalController.signUp);
exports.default = routerAuth;
