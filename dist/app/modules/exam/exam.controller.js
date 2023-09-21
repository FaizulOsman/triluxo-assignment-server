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
exports.ExamController = exports.addResult = void 0;
const exam_service_1 = require("./exam.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const exam_constants_1 = require("./exam.constants");
const pagination_1 = require("../../../constants/pagination");
const config_1 = __importDefault(require("../../../config"));
const pick_1 = require("../../../shared/pick");
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
// Create Exam
const createExam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const examData = __rest(req.body, []);
    const result = yield exam_service_1.ExamService.createExam(examData, verifiedUser);
    // Send Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Exam Created Successfully',
        data: result,
    });
}));
// Get all exams
const getAllExams = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, exam_constants_1.examFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield exam_service_1.ExamService.getAllExams(filters, paginationOptions);
    // Send Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Exams retrieved Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// Get single Exam by id
const getSingleExam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield exam_service_1.ExamService.getSingleExam(id);
    // Send Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get Single Exam Successfully',
        data: result,
    });
}));
// Update Exam
const updateExam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield exam_service_1.ExamService.updateExam(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Exam updated successfully',
        data: result,
    });
}));
// Delete Exam
const deleteExam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield exam_service_1.ExamService.deleteExam(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Exam deleted successfully',
        data: result,
    });
}));
// Add Result
exports.addResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const token = req.headers.authorization;
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = yield exam_service_1.ExamService.addResult(id, updateData, verifiedUser);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Result added successfully',
        data: result,
    });
}));
exports.ExamController = {
    createExam,
    getAllExams,
    getSingleExam,
    updateExam,
    deleteExam,
    addResult: exports.addResult,
};
