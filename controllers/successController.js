const path = require('path');

exports.getSuccess = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/success.html'));
};
