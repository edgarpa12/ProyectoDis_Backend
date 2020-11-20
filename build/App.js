"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var member_routes_1 = __importDefault(require("./routes/member.routes"));
var structure_routes_1 = __importDefault(require("./routes/structure.routes"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var App = /** @class */ (function () {
    function App() {
        this.express = express_1.default();
        this.setMiddlewares();
        this.setRoutes();
    }
    App.prototype.setMiddlewares = function () {
        this.express.use(cors_1.default());
        this.express.use(morgan_1.default('dev'));
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(helmet_1.default());
        this.express.use(cookie_parser_1.default());
    };
    App.prototype.setRoutes = function () {
        this.express.use('/api/auth', auth_routes_1.default);
        this.express.use('/api/member', member_routes_1.default);
        this.express.use('/api/structure', structure_routes_1.default);
    };
    return App;
}());
exports.default = new App().express;
