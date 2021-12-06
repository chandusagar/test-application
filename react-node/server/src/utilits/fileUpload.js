import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({
  storage: storage,
  limits: { fieldSize: 100000 },
});

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000 },
// });

// app.use("/profile", express.static("upload/images"));
// app.post("/upload", upload.single("profile"), async (req, res) => {
//   console.log(req.file);
//   res.json({
//     success: 1,
//     profile_url: `http://localhost:5000/profile/${req.file.filename}`,
//   });
// });

// function errorHandler(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     res.json({
//       success: 0,
//       message: err.message,
//     });
//   }
// }

// app.use(errorHandler);
