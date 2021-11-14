const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, `${__dirname}/../uploads`);
  },

  filename: (req, _file, callback) => {
    const { id } = req.params;

    const fileName = `${id}.jpeg`;

    const filePath = `localhost:3001/src/uploads/${id}.jpeg`;

    req.filePath = filePath;

    callback(null, fileName);
  },
});

module.exports = multer({ storage }).single('image');