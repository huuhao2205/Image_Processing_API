import express from "express";
import path from "path";
import { resizeImage, resizedImagePath } from "../../utils/resizeImages";
import { promises as fsPromises } from "fs";
import fs from "fs";

const images = express.Router();

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

const validate = async (query: ImageQuery): Promise<null | string> => {
  if (!query.filename) {
    return "Please pass a valid filename in the 'filename' query segment";
  }

  if (!query.width && !query.height) {
    return "Missing size value";
  }
  const width: number = parseInt(query.width || "");
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query segment.";
  }

  const height: number = parseInt(query.height || "");
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query segment.";
  }

  return null;
};
images.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const filename = req.query.filename as unknown as string;
    const height = parseInt(req.query.height as unknown as string);
    const width = parseInt(req.query.width as unknown as string);

    const validationMessage: null | string = await validate(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }
    const outputImgPath: string = resizedImagePath(filename, height, width);
    if (!fs.existsSync(outputImgPath)) {
      const resizedImage = await resizeImage(filename, height, width);
      await fsPromises.writeFile(outputImgPath, resizedImage);
    }
    res.sendFile(path.resolve(outputImgPath));
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
});

export default images;
