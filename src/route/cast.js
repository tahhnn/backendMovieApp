import { Router } from "express";
import {
  addCast,
  getCast,
  getCasts,
  removeCast,
  updateCast,
} from "../app/controllers/castController.js";
const route = Router();

route.put("/update/:id", updateCast);
route.delete("/delete/:id", removeCast);
route.post("/addCast", addCast);
route.get("/:id", getCast);
route.get("/", getCasts);

export default route;
