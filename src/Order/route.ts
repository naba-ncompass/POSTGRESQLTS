import {create,findAll,deleteAll, signup, signin} from "./controller";
import express from "express";
import validation from "./validation"
const router = express.Router();


const routeruse = (app:any) => {

  router.post("/insert",validation.validation,create);  //
  router.get("/read", findAll);
  router.delete("/deleteall", deleteAll);
  router.post("/signup",signup);
  router.post("/signin", signin);
  app.use("/", router);
};
  
export default routeruse;