const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Route untuk halaman galeri
router.get('/gallery', (req, res) => {
  const videoDir = path.join(__dirname, '../public/videos');
  const allVideos = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));

  let videosToDisplay;

  // Cek apakah user sudah login
  if (req.session.isLoggedIn) {
    videosToDisplay = allVideos; // Tampilkan semua video jika login
  } else {
    videosToDisplay = allVideos.slice(0, 1); // Tampilkan hanya satu video jika tidak login
  }

  res.render('gallery', { videos: videosToDisplay });
});

module.exports = router;
