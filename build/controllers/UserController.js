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
const Role_1 = __importDefault(require("../db/models/Role"));
const User_1 = __importDefault(require("../db/models/User"));
const Helper_1 = __importDefault(require("../Helpers/Helper"));
const PasswordHelper_1 = __importDefault(require("../Helpers/PasswordHelper"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword, roleId } = req.body;
        const hashed = yield PasswordHelper_1.default.PasswordHashing(password);
        const user = yield User_1.default.create({
            name,
            email,
            password: hashed,
            roleId: roleId,
            active: true,
            verified: true,
        });
        return res.status(201).send(Helper_1.default.ResponseData(201, "Created", null, user));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(50, "", error, null));
    }
});
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "user not foudn", null, null));
        }
        const matched = yield PasswordHelper_1.default.passwordCompare(password, user.password);
        if (!matched) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Not Match", null, null));
        }
        const dataUser = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active
        };
        const token = Helper_1.default.GenerateToken(dataUser);
        const refreshToken = Helper_1.default.GenerateRefreshToken(dataUser);
        // console.log("reftoken : "+"-+0_________0+-"+refreshToken)
        user.accessToken = refreshToken;
        yield user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const responseUser = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
            token: token
        };
        return res.status(200).send(Helper_1.default.ResponseData(200, "data match", null, responseUser));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, "", error, null));
    }
});
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        // console.log(refreshToken);
        if (!refreshToken) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Error reftoken", null, null));
        }
        const decodedUser = Helper_1.default.ExtractRefreshToken(refreshToken);
        // console.log(decodedUser);
        if (!decodedUser) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Error DecUser", null, null));
        }
        const token = Helper_1.default.GenerateToken({
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
        });
        const resultUser = {
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
            token: token
        };
        return res.status(200).send(Helper_1.default.ResponseData(200, "Ok", null, resultUser));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, "reftoken", error, null));
    }
});
const UserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = res.locals.userEmail;
        const user = yield User_1.default.findOne({
            where: {
                email: email
            },
            include: {
                model: Role_1.default,
                attributes: ["id", "roleName"]
            }
        });
        if (!user) {
            return res.status(404).send(Helper_1.default.ResponseData(404, "User Not FOUND", null, null));
        }
        user.password = "";
        user.accessToken = "";
        return res.status(200).send(Helper_1.default.ResponseData(200, "Current User", null, user));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, "reftoken", error, null));
    }
});
const UserLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(200).send(Helper_1.default.ResponseData(200, "E:2 reftoken : Logout", null, null));
        }
        const email = res.locals.userEmail;
        const user = yield User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            res.clearCookie("refreshToken");
            return res.status(404).send(Helper_1.default.ResponseData(404, "User Not FOUND", null, null));
        }
        res.clearCookie("refreshToken");
        yield user.update({ accessToken: null }, { where: { email } });
        return res.status(200).send(Helper_1.default.ResponseData(200, "Success Logout", null, null));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, "E:1 logout", error, null));
    }
});
exports.default = { Register, UserLogin, RefreshToken, UserDetail, UserLogout };
