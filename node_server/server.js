const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const sanitizeHtml = require('sanitize-html');
const multer = require('multer'); // 파일 업로드를 위한 라이브러리
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

const port = 7223;
app.listen(port, function () {
  console.log(port+'포트로 서버 오픈')
});

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image'); // 이미지를 저장할 디렉토리 설정
      // cb(null, ' ../pad/public/image');
     
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

app.post('/node/board/image', upload.single('file'), (req, res) => {
  const { file } = req;
  const imgName = req.file.filename;

  // 이동할 경로 설정 (React 앱의 public 폴더)
  const destinationPath = path.join(__dirname, '../pad/public/image', imgName);

  // 파일 이동
  fs.rename(file.path, destinationPath, (err) => {
    if (err) {
      console.error('Error moving file:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.json(imgName)
  });
});