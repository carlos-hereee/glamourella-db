const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { galleryEmpty, notFound, filePath } = require("../../config");

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

router.get("/", async (req, res) => {
  const imagetypes = [".png", ".PNG", ".jpg"];
  const pathname = req.query.url;
  const file = filePath(pathname);
  try {
    // Checking if the path exists
    const data = await fs.existsSync(file);
    if (data) {
      // Extracting file extension
      const ext = path.extname(pathname);
      // Setting default Content-Type
      let contentType = "text/plain";
      // Checking if the extension of image is '.png'
      if (imagetypes.includes(ext)) {
        contentType = "image/png";
      }
      // Setting the headers
      res.writeHead(200, { "Content-Type": contentType });
      // Reading the file
      fs.readFile(file, (_, content) => {
        // Serving the image
        return res.end(content);
      });
    } else return res.status(404).json(notFound);
  } catch (err) {
    res.status(400).json(galleryEmpty);
  }
});
router.get("/all-src", (req, res) => {});
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
