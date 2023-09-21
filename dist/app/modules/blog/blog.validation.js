"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        imageUrl: zod_1.z.string().optional(),
        videoUrl: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
const updateBlogZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        imageUrl: zod_1.z.string().optional(),
        videoUrl: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.BlogValidation = {
    createBlogZodValidation,
    updateBlogZodValidation,
};
