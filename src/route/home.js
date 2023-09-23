import { Router } from "express";
import fs from "fs";
import { homeSite, searchMovies } from "../app/controllers/home.js";
const route = Router();

route.get("/", homeSite);
route.get("/search", searchMovies);
export default route;
