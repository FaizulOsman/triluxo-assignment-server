"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
const auth_router_1 = require("../modules/auth/auth.router");
const blog_route_1 = require("../modules/blog/blog.route");
const comment_route_1 = require("../modules/comment/comment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_router_1.AuthRouter,
    },
    {
        path: '/users',
        route: user_router_1.UserRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/comments',
        route: comment_route_1.CommentRoutes,
    },
];
moduleRoutes === null || moduleRoutes === void 0 ? void 0 : moduleRoutes.forEach(route => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
