import { Router } from "express";
import fs from "fs";
import { __dirname } from "../server.js";
import path from "path";
import multer from "multer";
const routes = Router();
import {
  AddMovies,
  DeleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../app/controllers/movies.js";
import { checkPermission } from "../app/middlewares/checkPermission.js";
const upload = multer({
  limits: {
    fieldSize: 1 * 1024 * 1024,
  },
});

routes.get("/products/list/detail/:slug", getMovie);
routes.delete("/products/delete/:slug", checkPermission, DeleteMovie);
routes.put("/products/update/:slug", checkPermission, updateMovie);
routes.get("/products/list", getAllMovies);
routes.post("/products/add", checkPermission, AddMovies);
export default routes;
