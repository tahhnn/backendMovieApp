import Joi from "joi";
import Genres from "../models/genres";
import { GenreSchema } from "../../validation";
export const showGenre = async (req, res) => {
  try {
    const genresList = await Genres.find({});
    res
      .status(200)
      .send({ message: "Lấy dữ liệu thành công", data: genresList });
    res.end();
  } catch (err) {
    res.status(500).send({ message: err.message });
    res.end();
  }
};
export const showOne = async (req, res) => {
  const id = req.params.id;
  try {
    const genre = await Genres.findOne({ _id: id });
    if (!genre) {
      res.status(404).send({ message: "Không tìm thấy dữ liệu" });
    }
    res.status(200).send({ message: "Lấy dữ liệu thành công", data: genre });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  res.end();
};
export const deleteGen = async (req, res) => {
  const id = req.params.id;
  try {
    await Genres.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const addGen = async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  try {
    const existGenres = await Genres.findOne({ _id: id });
    if (existGenres) {
      throw new Error("Đã tồn tại");
    } else {
      const newGenres = new Genres(newData);
      newGenres.save();
      res
        .status(208)
        .send({ message: "Thêm dữ liệu thành công", data: newGenres });
      res.end();
    }
  } catch (err) {
    res.status(200).send({ message: err.message });
    res.end();
  }
};
export const updateGen = async (req, res) => {
  const newData = req.body;
  const { error } = GenreSchema.validate(newData);
  try {
    if (!error) {
      await Genres.findByIdAndUpdate(
        { _id: req.params.id },
        { ...newData },
        { new: true }
      );
      res.status(200).send({ message: "Sửa thành công", data: newData });
      res.end();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    res.end();
  }
};
