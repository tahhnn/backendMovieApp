import fs from "fs";
import path from "path";
import { __dirname } from "../../server.js";
import Movies from "../models/movies.js";
import { query } from "express";
export const homeSite = (req, res) => {
  const html = fs.readFileSync(
    path.join(__dirname, "/pages/home.html"),
    "utf8"
  );
  res.send(html);
  res.end();
};
export const searchMovies = async (req, res) => {
  const text = req.query.text;
  try {
    const data = await Movies.aggregate([
      {
        $match: {
          title: {
            $regex: new RegExp(text, "i"),
          },
        },
      },
    ]);
    // const data = await Movies.aggregate().search({
    //   text: {
    //     query: text,
    //   },
    // });

    res.send({ message: "Tìm kiếm thành công", data: data });
    res.end();
  } catch (e) {
    res.send({ message: e.message });
    res.end();
  }
};
