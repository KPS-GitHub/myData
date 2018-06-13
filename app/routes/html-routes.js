var path = require("path");


module.exports = function(app) {

    app.get("/", function(req,res) {
        res.sendFile(path.join(__dirname, "../../public/home.html"));
    });

    // app.get("/calories", function(req,res) {
    //     res.sendFile(path.join(__dirname, "../../public/calories.html"));
    // });

    app.get("/spending", function(req,res) {
        res.sendFile(path.join(__dirname, "../../public/spending.html"));
    });

}