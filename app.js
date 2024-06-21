const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const contactRoutes = require('./routes/contactRoutes');
const successRoutes = require('./routes/successRoutes');
const errorController = require('./controllers/errorController');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(contactRoutes);
app.use(successRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/message', (req, res) => {
    const { message } = req.body;
    const username = req.cookies.username;

    if (!username) {
        return res.status(400).send("No username found in cookies. Please log in.");
    }

    const newMessage = { username, message };
    const messagesFile = path.join(__dirname, 'messages.json');

    fs.readFile(messagesFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let messages;
        try {
            messages = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            messages = [];
        }

        messages.push(newMessage);
        fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/');
        });
    });
});

// Middleware to handle 404 errors
app.use(errorController.get404);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
