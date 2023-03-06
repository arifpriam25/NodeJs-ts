import rBase from "./Base.route";
import cBook from "../controllers/Book.controller"
import vBook from "../middleware/validation/Book.validation";
import Auth from "../middleware/Authorization";

class UserRoutes extends rBase {
    public routes(): void {
        this.router.post("/Insert",Auth.Authenticated,vBook.insert,cBook.Insert);
    }
}
export default new UserRoutes().router;