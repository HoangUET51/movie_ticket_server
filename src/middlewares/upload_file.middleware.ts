import multer from "multer";

export const upLoadImage = (type: string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/${type}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upLoad = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const listImgFile = [".png", ".jpg", ".svg"];
      const fileUpdate = file.originalname.slice(-4);
      const checkFile = listImgFile.includes(fileUpdate);
      if (checkFile) {
        cb(null, true);
      } else {
        cb(new Error("extentions not found"));
      }
    },
  });

  return upLoad.single(type);
};
