var path = require("path");


module.exports = function(app) {

    app.get("/", function(req,res) {
        res.sendFile(path.join(__dirname, "../views/home.hbs"));
    });

    app.get("/calories", function(req,res) {
        res.sendFile(path.join(__dirname, "../views/calories.hbs"));
    });

    app.get("/spending", function(req,res) {
        res.sendFile(path.join(__dirname, "../views/spending.hbs"));
    });

}