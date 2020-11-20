"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("./config"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(config_1.default.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: config_1.default.DB_NAME
})
    .then(function () {
    console.log('mongodb is connected');
})
    .catch(function (error) {
    console.log('mongodb not connected');
    console.log(error);
    process.exit();
});
