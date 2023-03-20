import express, { Application, Request, Response } from "express"
import { config as dotenv } from "dotenv"
import cookieParser from "cookie-parser"

import rRole from "./routes/Role.router"
import rUser from "./routes/User.router"
import rBook from "./routes/Book.router"
// import rTest from "./routes/Test.route"
dotenv()

class App {
    public app: Application
    constructor() {
        this.app = express()
        this.plugin()
        this.routes()
    }
    protected plugin(): void {
        this.app.use(express.json())
        this.app.use(cookieParser())
    }
    protected routes() {
        this.app.get("/", (err:Error, req: Request, res: Response) => {
            return res.status(200).send({
                response: "Program work!"
            })
        })
        this.app.use("/role", rRole)
        this.app.use("/user", rUser)
        this.app.use("/book", rBook)
        // this.app.use("/test", rTest)
    }

}
const app = new App().app
app.listen(process.env.APP_PORT, () => {
    console.log((`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`))
})