import { Router } from "express";
import { signIn, signUp } from "../app/controllers/userController";
const route = Router();

route.post("/signin", signIn);
route.post("/signUp", signUp);

export default route;
