const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../database.json');

// Fungsi untuk membaca database dan menginisialisasi jika kosong
const readDatabase = (callback) => {
    fs.readFile(dbPath, (err, data) => {
        if (err && err.code === 'ENOENT') {
            const db = { users: [] };
            return fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                if (err) return callback(err);
                callback(null, db);
            });
        } else if (err) {
            return callback(err);
        }

        try {
            const db = JSON.parse(data);
            callback(null, db);
        } catch (parseError) {
            callback(parseError);
        }
    });
};

// Fungsi untuk menulis ke database
const writeDatabase = (db, callback) => {
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), callback);
};

// Rute untuk halaman utama
router.get('/', (req, res) => {
    res.render('index');
});

// Rute untuk halaman gallery
router.get('/gallery', (req, res) => {
    const videosDir = path.join(__dirname, '../public/videos');
    fs.readdir(videosDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading video directory');
        }
        res.render('gallery', { videos: files });
    });
});

// Rute untuk menampilkan dua video acak
router.get('/randomGallery', (req, res) => {
    const videosDir = path.join(__dirname, '../public/videos');
    fs.readdir(videosDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading video directory');
        }

        if (files.length < 2) {
            return res.status(500).send('Not enough videos in the directory');
        }

        const randomVideos = files.sort(() => 0.5 - Math.random()).slice(0, 2);
        res.render('randomGallery', { randomVideos });
    });
});

// Rute untuk menampilkan halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Rute untuk menampilkan halaman register
router.get('/register', (req, res) => {
    res.render('register'); // Pastikan ada file register.ejs untuk ditampilkan
});

// Rute untuk menangani registrasi
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Membaca database
        readDatabase((err, db) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading database');
            }

            // Cek apakah email sudah terdaftar
            const userExists = db.users.some(user => user.email === email);
            if (userExists) {
                return res.status(400).send('Email already registered');
            }

            // Menambahkan user baru dengan password tanpa hashing
            const newUser = {
                name,
                email,
                password, // Simpan password tanpa hashing
                timestamp: new Date().toISOString()
            };
            db.users.push(newUser);

            // Menyimpan ke database
            writeDatabase(db, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error saving user');
                }
                // Redirect ke halaman login setelah registrasi berhasil
                res.redirect('/login');
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing registration');
    }
});

// Rute untuk menangani login
router.post('/login', (req, res) => {
    console.log('Request body:', req.body); // Tambahkan log untuk melihat isi req.body

    const { name, password } = req.body;

    console.log('Login attempt:', { name, password });

    readDatabase((err, db) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }

        const user = db.users.find(u => u.name === name);
        console.log('User found:', user);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        if (user.password !== password) {
            return res.status(401).send('Invalid email or password');
        }

        res.redirect('/gallery');
    });
});

module.exports = router;
