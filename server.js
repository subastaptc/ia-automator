const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '/tmp/' });

const app = express();

// Endpoint que coincide EXACTAMENTE con tu automation.js
app.post('/youtube-ssce0110', upload.array('videos'), (req, res) => {
  const videoCount = req.files ? req.files.length : 0;
  const comments = req.body.comments;
  
  console.log(`✅ Recibidos ${videoCount} vídeos`);
  console.log('Comentarios:', comments);
  
  // Respuesta que tu automation.js espera
  res.json({
    message: `ÉXITO: ${videoCount} vídeo(s) recibido(s) para SSCE0110`,
    success: true
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
});
