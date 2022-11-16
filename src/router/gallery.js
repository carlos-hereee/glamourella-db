const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  galleryEmpty,
  notFound,
  filePath,
  assetsPath,
  dbUrl,
} = require("../../config");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `assets/uploads/${req.user.uid}`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ dest: "assets/", storage: storage });
const imagetypes = [".png", ".PNG", ".jpg"];

const readFolder = (path, data) => {
  // reader assets folder
  const filenames = fs.readdirSync(path);
  // log new paths and old paths
  const { filePaths } = logPaths(path, filenames, data);
  if (filePaths && filePaths.length) {
    filePaths.forEach((ft) => readFolder(ft, data));
  }
  return { data };
};
const logPaths = (path, filenames, data) => {
  let filePaths = [];
  for (let f = 0; f < filenames.length; f++) {
    const file = filenames[f].split(".");
    // if it includes image extention
    if (file[1]) {
      const fileName = file.join(".");
      data.push({
        src: `${dbUrl}/gallery?url=${fileName}`,
        uid: uuidv4(),
        fileName,
        name: file[0],
      });
    } else {
      filePaths.push(`${path}/${file[0]}`);
    }
  }
  return { filePaths };
};
router.get("/", (req, res) => {
  const pathname = req.query.url;
  const file = filePath(pathname);
  try {
    // Checking if the path exists
    fs.existsSync(file)
      ? res.status(200).sendFile(file)
      : res.status(404).json(notFound);
  } catch (err) {
    console.log("err", err);
    res.status(500).json(serverErr);
  }
});
router.get("/all", async (req, res) => {
  try {
    const { data } = readFolder(assetsPath, []);
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json(notFound);
  }
});
router.post("/profile", upload.single("avatar"), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});
router.post("/photos/upload", upload.array("photos", 12), (req, res, next) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});
const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);
router.post("/cool-profile", cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

module.exports = router;
