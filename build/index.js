"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var config_1 = __importDefault(require("./config/config"));
require("./config/db");
var PORT = config_1.default.PORT;
App_1.default.listen(PORT, function () {
    console.log(PORT);
    return console.log("Server is listening on " + PORT);
});
