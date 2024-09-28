const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const videosDir = path.join(__dirname, '../public/videos');

// Rute untuk halaman random gallery
router.get('/randomGallery', (req, res) => {
    fs.readdir(videosDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading video directory');
        }

        // Mengambil dua video secara acak
        const randomVideos = files.sort(() => 0.5 - Math.random()).slice(0, 2);
        
        // Render halaman randomGallery.ejs
        res.render('randomGallery', { randomVideos });
    });
});

module.exports = router;
