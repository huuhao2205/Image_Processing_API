import express from "express";
import images from "./api/images";
import fs from "fs";
import path from "path";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  const imagesFilenames: string[] = fs
    .readdirSync(path.resolve("Assets/images/original"))
    .map((filename) => filename.slice(0, -4));
  res.render("index", { filenames: imagesFilenames });
});

routes.use("/images", images);

export default routes;
