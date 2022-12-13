const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images'); //"/images" is  folder storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname); //file.originalname has accesss to the file type
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
