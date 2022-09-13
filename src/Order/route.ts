import {insert,readDeviceAll,deleteAll, signup, signin} from "./controller";
import express from "express";
import {validation,validationust} from "./validation";
import {verifyToken} from "../Utilities/verifytoken";
const router = express.Router();


const routeruse = (app:any) => {

  router.post("/insert",      verifyToken,validation,          insert);  //
  router.get("/read",         verifyToken,                     readDeviceAll);
  router.delete("/deleteall", verifyToken,                     deleteAll);
  router.post("/signup",                  validationust,       signup);
  router.post("/signin",                  validationust,       signin);
  app.use("/", router);
};
  
export default routeruse;