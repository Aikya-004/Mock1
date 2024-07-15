const express = require('express');
const multer = require('multer');
const EasyOCR = require('easyocr');

const app = express();
const upload = multer({ dest: 'uploads/' });
const reader = new EasyOCR.Reader(['en']);

app.post('/ocr', upload.single('image'), async (req, res) => {
  try {
    const result = await reader.readtext(req.file.path);
    res.json(result);
  } catch (error) {
    res.status(500).send('Error performing OCR');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
