import fs from "fs";

export const removeImage = (image: string) => {
  fs.unlink(image, (err) => {
    if (err) console.log(err);
  });
};
