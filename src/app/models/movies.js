import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);
const moviesSchema = new mongoose.Schema(
  {
    title: { type: String },
    year: Number,
    genres: String,
    slug: { type: String, slug: "title" },
  },
  { timestamps: true }
);
const Movies = mongoose.model("movies", moviesSchema);

export default Movies;
