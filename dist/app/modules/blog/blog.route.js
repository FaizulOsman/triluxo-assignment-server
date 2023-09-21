"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-blog', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogZodValidation), blog_controller_1.BlogController.createBlog);
router.get('/:id', blog_controller_1.BlogController.getSingleBlog);
router.delete('/:id', blog_controller_1.BlogController.deleteBlog);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogZodValidation), blog_controller_1.BlogController.updateBlog);
router.get('/', blog_controller_1.BlogController.getAllBlogs);
exports.BlogRoutes = router;
