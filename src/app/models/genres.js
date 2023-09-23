import mongoose from "mongoose";

const genresSchema = new mongoose.Schema({
  name: String,
  rate: Number,
});
const Genres = mongoose.model("genres", genresSchema);

export default Genres;
