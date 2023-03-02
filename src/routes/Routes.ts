import express from "express";
import MasterMenuController from "../controllers/MasterMenuController";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import MasterMenu from "../db/models/MasterMenu";
import Authorization from "../middleware/Authorization";
import UserValidation from "../middleware/validation/UserValidation";

const router = express.Router();

//Role
router.get("/role",Authorization.Authenticated,RoleController.GetRole);
router.get("/role/:id",Authorization.Authenticated,RoleController.GetRoleById);
router.post("/role",Authorization.Authenticated,Authorization.AdminRole,RoleController.CreateRole);
router.post("/role/:id",Authorization.Authenticated,Authorization.AdminRole,RoleController.UpdateRole);
router.delete("/role/:id",Authorization.Authenticated,Authorization.SuperAdminRole,RoleController.DeleteRole);


//Users
router.post("/user/signup",UserValidation.RegisterValidation, UserController.Register);
router.post("/user/login",UserController.UserLogin);
router.get("/user/refresh-token",UserController.RefreshToken);
router.get("/user/current-user",Authorization.Authenticated,UserController.UserDetail);
router.get("/user/logout",Authorization.Authenticated,UserController.UserLogout);

//MasteerMenu
router.post("/menu",Authorization.Authenticated,Authorization.AdminRole,MasterMenuController.CreateMenu)
router.get("/menu",Authorization.Authenticated,Authorization.AdminRole,MasterMenuController.GetDetailMenu)
router.get("/menu/all",Authorization.Authenticated,Authorization.UserRole,MasterMenuController.GetAllMenu)
router.get("/menu/:id",Authorization.Authenticated,Authorization.AdminRole,MasterMenuController.GetDetailMenu)
router.patch("/menu/:id",Authorization.Authenticated,Authorization.AdminRole,MasterMenuController.UpdateMenu)
router.delete("/menu/:id:",Authorization.Authenticated,Authorization.AdminRole,MasterMenuController.SoftDeleteMenu)
router.delete("/menu/permanent/:id",Authorization.Authenticated,Authorization.SuperAdminRole,MasterMenuController.DeletePermanent)
export default router;