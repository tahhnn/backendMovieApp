import User from "../models/user";
import Joi from "joi";
import bcrypt from "bcrypt";
import { LogSchema, userSchema } from "../../validation";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { response } from "express";
dotenv.config();
const { SECRET_KEY } = process.env;
export const signUp = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    const { lastname, firstname, username, password, email } = req.body;
    const existUser = await User.findOne({ email: email });
    //kiểm tra trong user có tồn tại email đã đăng ký chưa
    if (existUser) {
      //nếu có
      throw new Error("Tài khoản đã tồn tại đã tồn tại");
    }
    if (!error) {
      const hashPassword = bcrypt.hashSync(password, 10);
      //thực hiện mã hóa mật khẩu
      const createUser = await User.create({
        lastname,
        firstname,
        username,
        email,
        password: hashPassword,
      });
      //tạo user
      res.send({
        messages: "Đăng ký thành công",
        data: createUser,
      });
      res.end();
    } else {
      const messages = error.details.map((item) => item.message);
      res.send({ message: messages });
      res.end();
    }
  } catch (e) {
    res.send({ message: e.message });
  }
  res.end();
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = LogSchema.validate(req.body, {
      abortEarly: true,
    });
    if (!error) {
      const existUser = await User.findOne({ email: email });
      //kiểm tra có tồn tại email đã đăng ký không
      if (!existUser) {
        //nếu không
        return res.send({ message: "Không tồn tại địa chỉ email" });
      }
      const hash = existUser.password;

      const comparePasswords = bcrypt.compareSync(password, hash);
      //thực hiện mã hóa và so sánh lại mất khẩu compare và mk vừa nhập
      if (!comparePasswords) {
        //nếu false
        return res.send({ message: "Mật khẩu không đúng" });
      }
      const accessToken = jwt.sign({ _id: existUser._id }, "46464747", {
        //tiến hành tạo token với id và mã bí mật với thời gian tồn tại là 1 ngày
        expiresIn: "1d",
      });
      existUser.password = undefined;
      //chuyển password thành undifinded tránh hiện mật khẩu
      return res.send({
        message: "Đăng nhập thành công",
        existUser,
        accessToken,
      });
    } else {
      const message = error.details.map((e) => e.message);
      res.send({ message: message });
    }
  } catch (e) {
    return res.send({ message: e.message });
  }
};
