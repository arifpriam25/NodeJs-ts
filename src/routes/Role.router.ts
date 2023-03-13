import rBase from "./Base.route";
import cRole from "../controllers/Role.controller";
import Auth from "../middleware/Authorization";

class RoleRoutes extends rBase {
    public routes():void{
        this.router.get("/",Auth.authenticated,Auth.adminRole,cRole.getAll);
        this.router.get("/:id",Auth.authenticated,cRole.getById);
        this.router.post("/",Auth.authenticated,Auth.adminRole,cRole.create);
        this.router.post("/:id",Auth.authenticated,Auth.adminRole,cRole.update);
        this.router.delete("/:id",Auth.authenticated,Auth.adminRole,cRole.delete);
    }
}

export default new RoleRoutes().router;