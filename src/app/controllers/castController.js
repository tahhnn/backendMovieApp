import Joi from "joi";
import Casts from "../models/cast";
const castSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(5).messages({
    "string.empty": "{{#label}} dữ liệu bắt buộc",
    "string.min": "{{#label}} dữ liệu tối thiểu 5 ký tự",
  }),
});
export const getCasts = async (req, res) => {
  const list = await Casts.find({});
  res.send(list);
  res.end();
};
export const getCast = async (req, res) => {
  const inList = await Casts.findOne({ _id: req.params.id });
  res.send(inList);
  res.end();
};
export const addCast = async (req, res) => {
  const newCast = new Casts(req.body);
  newCast.save();
  res.send(newCast);
  res.end();
};
export const removeCast = async (req, res) => {
  await Casts.findByIdAndDelete({ _id: req.params.id });
  res.send("Deleted");
};
export const updateCast = async (req, res) => {
  await Casts.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  res.send(req.body);
  res.end();
};
