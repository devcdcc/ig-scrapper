"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_router_1 = __importDefault(require("./user-router"));
var app = express_1.default();
app.use(body_parser_1.default({ limit: '50mb' }));
app.use(body_parser_1.default.json());
app.use("/user", user_router_1.default);
app.post('/', function (request, response) {
    response.send(request.body);
});
app.listen(3000);
