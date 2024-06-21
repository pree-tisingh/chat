const path = require('path');

exports.getContactUs = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contactus.html'));
};

exports.postContactUs = (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/success');
};
