import moviesRouter from "../route/movies.js";
import homeRouter from "../route/home.js";
import castRouter from "../route/cast.js";
import genRouter from "../route/genres.js";
import UserRoute from "./user.js";
function router(app) {
  app.use("/", homeRouter);
  app.use("/movies", moviesRouter);
  app.use("/cast", castRouter);
  app.use("/genres", genRouter);
  app.use("/user", UserRoute);
}

export default router;
