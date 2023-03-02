"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = __importDefault(require("../Helpers/Helper"));
const Authenticated = (req, res, next) => {
    try {
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];
        if (token === null) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Unauthorized: Auth.001", null, null));
        }
        const result = Helper_1.default.ExtractToken(token);
        console.log(result);
        if (!result) {
            // console.log(token)
            return res.status(401).send(Helper_1.default.ResponseData(401, "Unauthorized Auth.002", null, null));
        }
        res.locals.userEmail = result.email;
        res.locals.roleId = result.roleId;
        next();
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(50, "", error, null));
    }
};
const SuperAdminRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 1) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Forbidden bukan role superadmin", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(50, "", error, null));
    }
};
const AdminRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        console.log(roleId);
        if (roleId !== 2) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Forbidden bukan role admin", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(50, "", error, null));
    }
};
const UserRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 3) {
            return res.status(401).send(Helper_1.default.ResponseData(401, "Forbidden bukan role user", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(50, "", error, null));
    }
};
exports.default = { Authenticated, SuperAdminRole, AdminRole, UserRole };
