import { resizeImage } from "../utils/resizeImages";
import path from "path";

describe("Testing image processing", () => {
  it("Throws error when provide wrong filename", async () => {
    const pathO = path.resolve(
      __dirname,
      "../../Assets/images/original/none.jpg"
    );
    await expectAsync(resizeImage("none", 200, 200)).toBeRejectedWithError(
      Error,
      `Input file is missing: ${pathO}`
    );
  });

  it("Resolves succesfully when provided right parameter", async () => {
    await expectAsync(resizeImage("cat", 200, 200)).toBeResolved();
  });
});
