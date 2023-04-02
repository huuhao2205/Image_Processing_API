import { resizeImage } from "../utils/resizeImages";
import path from "path";

describe("Testing image processing", () => {
  it("Throws error when provide wrong filename", async () => {
    const pathO = path.resolve(
      `D:\\Udacity\\ImageProcessingAPI\\Assets\\images\\original\\none.jpg`
    );
    await expectAsync(resizeImage("none", 200, 200)).toBeRejectedWithError(
      Error,
      `Input file is missing: ${pathO}`
    );
  });

  it("Resolves succesfully when provided right parameter", async () => {
    await expectAsync(resizeImage("Cat", 200, 200)).toBeResolved();
  });
});
