// const express = require("express");
// const http = require("http");
// const app = express();
// const fs = require("fs");

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import router from "./route";
import mongoose from "mongoose";
import { connect } from "./config/connect.js";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
import dotenv from "dotenv";


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
dotenv.config();
router(app);
connect();
app.listen(8080, () => {
  console.log(`listening on : http://localhost:8080`);
});
