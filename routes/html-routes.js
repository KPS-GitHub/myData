var path = require("path");

module.exports = function(app) {

    app.get("/", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/user-home.html"));
    });

    app.get("/calories", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/calorie-count.html"));
    });

    app.get("/spending", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/spending.html"));
    });
};