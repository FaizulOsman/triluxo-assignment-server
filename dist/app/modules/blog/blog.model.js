"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
// Blog Schema
const BlogSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: [false, 'imageUrl is missing!'],
    },
    videoUrl: {
        type: String,
        required: [false, 'videoUrl is missing!'],
    },
    title: {
        type: String,
        required: [false, 'title is missing!'],
    },
    description: {
        type: String,
        required: [false, 'description is missing!'],
    },
    email: {
        type: String,
        required: [false, 'email is missing!'],
    },
    isPublished: {
        type: Boolean,
        required: [false, 'isPublished is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Blog = (0, mongoose_1.model)('Blog', BlogSchema);
