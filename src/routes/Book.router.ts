import rBase from "./Base.route";
import vBook from "../middleware/validation/Book.validation";
import Auth from "../middleware/Authorization";


import cOrder from "../controllers/Orders.controller";
import cBook from "../controllers/Book.controller"

class UserRoutes extends rBase {
    public routes(): void {
        this.router.post("/Insert",Auth.Authenticated,vBook.insert,cBook.Insert);
        this.router.get("/",Auth.Authenticated,cBook.getAll);
        this.router.get("/find/:id",Auth.Authenticated,cBook.getById);
        this.router.post("/update/:id",Auth.Authenticated,vBook.insert,cBook.update);
        this.router.delete("/delete/:id",Auth.Authenticated,cBook.delete);
        this.router.post("/buy",Auth.Authenticated,cOrder.buy)
    }
}
export default new UserRoutes().router;