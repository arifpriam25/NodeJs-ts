import rBase from "./Base.route";
import cTesting from "../controllers/Testing.controller"


class TestRoutes extends rBase {
    public routes(): void {
        this.router.get("/",cTesting.test);
    }
}
export default new TestRoutes().router;