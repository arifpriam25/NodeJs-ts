"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MasterMenuController_1 = __importDefault(require("../controllers/MasterMenuController"));
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const Authorization_1 = __importDefault(require("../middleware/Authorization"));
const UserValidation_1 = __importDefault(require("../middleware/validation/UserValidation"));
const router = express_1.default.Router();
//Role
router.get("/role", Authorization_1.default.Authenticated, RoleController_1.default.GetRole);
router.get("/role/:id", Authorization_1.default.Authenticated, RoleController_1.default.GetRoleById);
router.post("/role", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, RoleController_1.default.CreateRole);
router.post("/role/:id", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, RoleController_1.default.UpdateRole);
router.delete("/role/:id", Authorization_1.default.Authenticated, Authorization_1.default.SuperAdminRole, RoleController_1.default.DeleteRole);
//Users
router.post("/user/signup", UserValidation_1.default.RegisterValidation, UserController_1.default.Register);
router.post("/user/login", UserController_1.default.UserLogin);
router.get("/user/refresh-token", UserController_1.default.RefreshToken);
router.get("/user/current-user", Authorization_1.default.Authenticated, UserController_1.default.UserDetail);
router.get("/user/logout", Authorization_1.default.Authenticated, UserController_1.default.UserLogout);
//MasteerMenu
router.post("/menu", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, MasterMenuController_1.default.CreateMenu);
router.get("/menu", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, MasterMenuController_1.default.GetDetailMenu);
router.get("/menu/all", Authorization_1.default.Authenticated, Authorization_1.default.UserRole, MasterMenuController_1.default.GetAllMenu);
router.get("/menu/:id", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, MasterMenuController_1.default.GetDetailMenu);
router.patch("/menu/:id", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, MasterMenuController_1.default.UpdateMenu);
router.delete("/menu/:id:", Authorization_1.default.Authenticated, Authorization_1.default.AdminRole, MasterMenuController_1.default.SoftDeleteMenu);
router.delete("/menu/permanent/:id", Authorization_1.default.Authenticated, Authorization_1.default.SuperAdminRole, MasterMenuController_1.default.DeletePermanent);
exports.default = router;
