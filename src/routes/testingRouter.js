import { Router } from "express";
import { __dirname } from "../utils/misc_utils.js";

const testingRouter = Router();
testingRouter.get('/loggerTest',(req, res) => {
    req.logger.fatal("This is a fatal error");
    req.logger.error("This is a normal error");
    req.logger.warning("This is a warning");
    req.logger.info("This is an info, change the .env and write 'Debug' to get the Debug Logger.");
    req.logger.http("This is an http");
    req.logger.debug("This is a debug.");
    res.send("Check Logs.")
})
export default testingRouter;