"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const blog_model_1 = require("./blog.model");
const http_status_1 = __importDefault(require("http-status"));
const blog_constants_1 = require("./blog.constants");
const user_model_1 = require("../user/user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
// Create Blog
const createBlog = (payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({ _id: verifiedUser.id });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
// Get All Blogs (can also filter)
const getAllBlogs = (filters, paginationOptions, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: blog_constants_1.blogSearchableFields === null || blog_constants_1.blogSearchableFields === void 0 ? void 0 : blog_constants_1.blogSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                return { [field]: value };
            }),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    let result = yield blog_model_1.Blog.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'user') {
        result = yield blog_model_1.Blog.find({
            $and: [whereCondition, { email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email }],
        })
            .sort(sortCondition)
            .skip(skip)
            .limit(limit);
    }
    const total = yield blog_model_1.Blog.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single Blog
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id);
    return result;
});
const updateBlog = (id, payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield blog_model_1.Blog.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Blog not found');
    }
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'user' && (isExist === null || isExist === void 0 ? void 0 : isExist.email) !== (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email)) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not allowed');
    }
    const result = yield blog_model_1.Blog.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Blog
const deleteBlog = (id, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield blog_model_1.Blog.findOne({ _id: id });
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'user' && (isExist === null || isExist === void 0 ? void 0 : isExist.email) !== (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email)) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not allowed');
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Blog Not Found');
    }
    return result;
});
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
