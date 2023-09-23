import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const castSchema = new mongoose.Schema({
  name: { type: String },
  sex: String,

  slug: { type: String, slug: "name" },
});
castSchema.plugin(slug);
const Casts = mongoose.model("casts", castSchema);

export default Casts;
