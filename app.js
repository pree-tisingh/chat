const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const successRoutes = require('./routes/successRoutes');
const errorController = require('./controllers/errorController');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(productRoutes);
app.use(contactRoutes);
app.use(successRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.use(errorController.get404);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
