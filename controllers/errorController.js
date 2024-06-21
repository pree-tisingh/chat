const path = require('path');

exports.get404 = (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/error404.html'));
};
