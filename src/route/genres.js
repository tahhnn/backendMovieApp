import { Router } from "express";
import {
  addGen,
  deleteGen,
  showGenre,
  showOne,
  updateGen,
} from "../app/controllers/genreController";
import { checkPermission } from "../app/middlewares/checkPermission";
const route = Router();

route.get("/", checkPermission, showGenre);
route.get("/:id", checkPermission, showOne);
route.post("/addGenre", checkPermission, addGen);
route.put("/editGenre/:id", checkPermission, updateGen);
route.delete("/deleteGen/:id", checkPermission, deleteGen);
export default route;
