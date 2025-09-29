const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const { OpenAI } = require('openai');

const upload = multer({ dest: '/tmp/' });
const app = express();

// === CONFIGURACIÓN ===
const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// === RUTAS DE AUTOMATIZACIÓN ===

// 1. Subir vídeo a YouTube (SSCE0110)
app.post('/youtube-ssce0110', upload.single('video'), async (req, res) => {
  try {
    const description = req.body.description || 'Subido automáticamente';
    console.log('Vídeo recibido para SSCE0110:', req.file?.originalname);
    res.json({ message: '✅ Vídeo para SSCE0110 recibido', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Crear Short para Instagram
app.post('/instagram-short', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Crea una historia corta para Instagram Short: ${prompt}` }]
    });
    res.json({ 
      message: '✅ Short para Instagram generado',
      story: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Crear Short para TikTok + YouTube (conexion.teen)
app.post('/tiktok-youtube', upload.single('video'), async (req, res) => {
  try {
    const description = req.body.description || 'Contenido automático';
    console.log('Vídeo recibido para TikTok/YouTube:', req.file?.originalname);
    res.json({ message: '✅ Vídeo para TikTok/YouTube recibido', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
});
