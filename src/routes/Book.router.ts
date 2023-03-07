import rBase from "./Base.route";
import cBook from "../controllers/Book.controller"
import vBook from "../middleware/validation/Book.validation";
import Auth from "../middleware/Authorization";

class UserRoutes extends rBase {
    public routes(): void {
        this.router.post("/Insert",Auth.Authenticated,vBook.insert,cBook.Insert);
        this.router.get("/",Auth.Authenticated,cBook.getAll);
        this.router.get("/:id",Auth.Authenticated,cBook.getById);
        this.router.post("/update/:id",Auth.Authenticated,vBook.insert,cBook.update);
        this.router.delete("/delete/:id",Auth.Authenticated,cBook.delete);
    }
}
export default new UserRoutes().router;