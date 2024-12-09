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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const express_1 = require("express");
const accountRouter = (0, express_1.Router)();
const generateToken = (userId) => {
    const expiresIn = 24 * 60 * 60;
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.SECRET, { expiresIn });
};
const createNewUser = (mail, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    if (!hashedPassword) {
        throw new Error("Failed hashing your password");
    }
    const employee = yield prismaClient_1.default.user.create({
        data: {
            mail: mail,
            hashedPassword: hashedPassword,
        },
    });
    if (!employee)
        throw new Error("Failed creating new user in new db.");
    return employee;
});
accountRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, password } = req.body;
    if (!mail || !password)
        return res.status(400).json({ msg: "Bad parameters" });
    try {
        let user = yield prismaClient_1.default.user.findUnique({
            where: { mail: mail },
        });
        if (user)
            return res.status(409).json({ msg: "User exists." });
        user = yield createNewUser(mail, password);
        const token = generateToken(user.userId);
        return res.status(201).json({ token: token });
    }
    catch (error) {
        return res.status(500).json({ msg: `Internal Server Error ${error}` });
    }
}));
accountRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, password } = req.body;
    if (!mail || !password)
        return res.status(400).json({ msg: "Bad parameters" });
    try {
        let user = yield prismaClient_1.default.user.findUnique({
            where: { mail: mail },
        });
        if (!user) {
            return res.status(409).json({ msg: "Invalid Credentials" });
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.hashedPassword);
        if (yield !isValidPassword)
            return res.status(409).json({ msg: "Invalid Credentials" });
        const token = generateToken(user.userId);
        return res.status(200).json({ token: token });
    }
    catch (error) {
        return res.status(500).json({ msg: `Internal Server Error ${error}` });
    }
}));
exports.default = accountRouter;
//# sourceMappingURL=account.js.map