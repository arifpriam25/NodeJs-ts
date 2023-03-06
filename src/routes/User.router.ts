import rBase from "./Base.route";
import cUser from "../controllers/User.controller"
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

class UserRoutes extends rBase {
    public routes(): void {
        this.router.post("/signup",UserValidation.RegisterValidation, cUser.Register);
        this.router.post("/login",cUser.UserLogin);
        this.router.get("/refresh-token",cUser.RefreshToken);
        this.router.get("/current-user",Authorization.Authenticated,cUser.UserDetail);
        this.router.get("/logout",Authorization.Authenticated,cUser.UserLogout);
    }
}
export default new UserRoutes().router;