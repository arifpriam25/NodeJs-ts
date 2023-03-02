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
const MasterMenu_1 = __importDefault(require("../db/models/MasterMenu"));
const Helper_1 = __importDefault(require("../Helpers/Helper"));
const CreateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, ordering } = req.body;
        const menu = yield MasterMenu_1.default.create({
            name,
            icon,
            ordering,
            active: true
        });
        return res.status(200).send(Helper_1.default.ResponseData(201, "Created", null, menu));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
const GetListMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield MasterMenu_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(Helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
const GetAllMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield MasterMenu_1.default.findAll();
        return res.status(200).send(Helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
const GetDetailMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(Helper_1.default.ResponseData(404, "Menu : NotFound", null, null));
        }
        return res.status(200).send(Helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
const UpdateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, icon, ordering } = req.body;
        const menu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(Helper_1.default.ResponseData(404, "Menu : NotFound", null, null));
        }
        menu.name = name;
        menu.icon = icon;
        menu.ordering = ordering;
        yield menu.save();
        return res.status(200).send(Helper_1.default.ResponseData(200, "Updated", null, null));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
const SoftDeleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(Helper_1.default.ResponseData(404, "Menu : NotFound", null, null));
        }
        menu.active = false;
        //  await MasterMenu.update()
        return res.status(200).send(Helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
const DeletePermanent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield MasterMenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(Helper_1.default.ResponseData(404, "Menu : NotFound", null, null));
        }
        yield menu.destroy();
        return res.status(200).send(Helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(Helper_1.default.ResponseData(500, " ", error, null));
    }
});
exports.default = { GetListMenu, CreateMenu, UpdateMenu, GetAllMenu, GetDetailMenu, SoftDeleteMenu, DeletePermanent };
