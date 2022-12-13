const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  //   max size 1mb
  limits: {
    fileSize: 1024 * 1024 * 1,
  },

  destination: (req, file, cb) => {
    cb(null, './images'); //"/images" is  folder storage
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.username +
        '.' +
        file.originalname.split('.')[file.originalname.split('.').length - 1]
    ); //file.originalname has accesss to the file type
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
