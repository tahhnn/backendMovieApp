import Joi from "joi";
export const userSchema = Joi.object({
  lastname: Joi.string().required().messages({
    "string.empty": "Phần last name phải nhập đầy đủ",
  }),
  firstname: Joi.string().required().messages({
    "string.empty": "Phần first name phải nhập đầy đủ",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email chưa đúng",
  }),
  username: Joi.string().min(5).max(50).required().messages({
    "string.empty": "Username không được để trống",
    "string.min": "Dữ liệu nhập tối thiểu 5 ký tự",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu tối thiểu 5 ký tự",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Mật khẩu không khớp",
  }),
});
export const movieSchema = Joi.object({
  title: Joi.string().required().min(5).messages({
    "any.required": "{{#label}} dữ liệu bắt buộc",
    "string.min": "{{#label}} dữ liệu tối thiểu 5 ký tự",
    "string.empty": "{{#label}} không được để trống",
  }),
  year: Joi.number().required().messages({
    "string.empty": "Vui lòng nhập đủ dữ liệu",
  }),
  genres: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập đủ dữ liệu",
  }),
});
export const GenreSchema = Joi.object({
  name: Joi.string().required().min(5).messages({
    "string.empty": "{{#label}} dữ liệu bắt buộc",
    "string.min": "{{#label}} dữ liệu tối thiểu 5 ký tự",
  }),
});
export const LogSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Không được để trống email",
    "string.email": "Email có vẻ chưa đúng",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Mật khẩu không được để trống",
  }),
});
