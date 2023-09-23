import fs from "fs";
import path from "path";
import { __dirname } from "../../server.js";
import sharp from "sharp";
import Joi from "joi";
import Movies from "../models/movies.js";
import { movieSchema } from "../../validation/index.js";
import { isBuffer } from "util";

export const getAllMovies = async (req, res) => {
  const page = req.query.page;
  const LIMIT = req.query.limit;
  const movies = await Movies.find({});
  try {
    if (page && movies.length > LIMIT) {
      const skip = (page - 1) * LIMIT;
      await Movies.find({})
        .skip(skip)
        .limit(LIMIT)
        .then((data) =>
          res.send({
            message: "Lấy dữ liệu thành công",
            data: data,
          })
        );
    } else {
      if (movies.length > 0) {
        res.send({ message: "Lấy dữ liệu thành công", data: movies });
        res.end();
      } else {
        res.send({ message: "Dữ liệu trống" });
        res.end();
      }
    }
  } catch (err) {
    res.send({ message: err.message });
    res.end();
  }
};
export const getMovie = async (req, res) => {
  const { slug } = req.params;
  try {
    const movies = await Movies.findOne({ _id: slug });
    res.send({ message: "Lấy dữ liệu thành công", data: movies });
    res.end();
  } catch (err) {
    res.send({ message: err.message });
  }
};
export const AddMovies = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  const { error } = movieSchema.validate(formData);
  try {
    if (!error) {
      const existData = await Movies.findOne({
        title: formData.title,
      });
      if (existData) {
        res.status(208).send({ message: "Phim đã tồn tại" });
      } else {
        const newData = new Movies(formData);
        await newData.save();
        res.status(201).send({ message: "Thêm thành công ", data: newData });
        res.end();
      }
    } else {
      const messages = error.details.map((item) => item.message);
      console.log(error);
      res.status(500).send({ message: messages });
      res.end();
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};
export const DeleteMovie = async (req, res) => {
  const { slug } = req.params;
  try {
    await Movies.deleteOne({ _id: slug });
    res.status(200).send({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const updateMovie = async (req, res) => {
  const { slug } = req.params;
  const dataUpdate = { ...req.body };

  try {
    const existData = await Movies.findOne({
      _id: { $ne: slug },
      ...dataUpdate,
    });
    console.log(existData);
    if (existData) {
      res.status(208).send({ message: "Đã tồn tại dữ liệu " });
    }
    const updatedMovie = await Movies.findOneAndUpdate(
      { _id: slug },
      dataUpdate,
      {
        new: true,
        overwrite: true,
      }
    );
    res.status(200).send({ message: "Update thành công", updatedMovie });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send("Error updating movie");
  }
};
