import rBase from "./Base.route";
import cUser from "../controllers/User.controller"
import validation from "../middleware/validation/validator";
import Authorization from "../middleware/Authorization";

class UserRoutes extends rBase {
    public routes(): void {
        this.router.post("/signup",validation.validateRegister, cUser.register);
        this.router.post("/login",cUser.UserLogin);
        this.router.get("/refresh-token",cUser.refreshToken);
        this.router.get("/current-user",Authorization.authenticated,cUser.userDetail);
        this.router.get("/logout",Authorization.authenticated,cUser.userLogout);
    }
}
export default new UserRoutes().router;