"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
// Comment Schema
const CommentSchema = new mongoose_1.Schema({
    blogId: {
        type: String,
        required: [true, 'blogId is missing!'],
    },
    userName: {
        type: String,
        required: [true, 'userName is missing!'],
    },
    userEmail: {
        type: String,
        required: [true, 'userEmail is missing!'],
    },
    question: {
        type: String,
        required: [true, 'question is missing!'],
    },
    replies: [
        {
            name: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            reply: {
                type: String,
                required: false,
            },
        },
    ],
    likes: [
        {
            email: {
                type: String,
                required: false,
            },
            isLiked: {
                type: Boolean,
                required: false,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Comment = (0, mongoose_1.model)('Comment', CommentSchema);
