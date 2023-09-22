"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-comment', (0, validateRequest_1.default)(comment_validation_1.CommentValidation.createCommentZodValidation), comment_controller_1.CommentController.createComment);
// router.get('/:id', CommentController.getSingleComment);
router.get('/:id', comment_controller_1.CommentController.getCommentsById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), comment_controller_1.CommentController.deleteComment);
router.patch('/:id', (0, validateRequest_1.default)(comment_validation_1.CommentValidation.updateCommentZodValidation), comment_controller_1.CommentController.updateComment);
router.get('/', comment_controller_1.CommentController.getAllComments);
exports.CommentRoutes = router;
