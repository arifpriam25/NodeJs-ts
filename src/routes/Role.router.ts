import rBase from "./Base.route";
import cRole from "../controllers/Role.controller";
import Auth from "../middleware/Authorization";

class RoleRoutes extends rBase {
    public routes():void{
        this.router.get("/",Auth.Authenticated,Auth.AdminRole,cRole.GetAll);
        this.router.get("/:id",Auth.Authenticated,cRole.GetById);
        this.router.post("/",Auth.Authenticated,Auth.AdminRole,cRole.Create);
        this.router.post("/:id",Auth.Authenticated,Auth.AdminRole,cRole.Update);
        this.router.delete("/:id",Auth.Authenticated,Auth.AdminRole,cRole.Delete);
    }
}

export default new RoleRoutes().router;