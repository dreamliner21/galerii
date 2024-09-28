const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();

// Setup view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parsing data form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Gunakan authRoutes untuk semua rute
app.use('/', authRoutes);

// Jalankan server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
