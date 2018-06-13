var path = require("path");

var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", isAuthenticated, function(req,res) {
        res.sendFile(path.join(__dirname, "../../public/home.html"));
    });


    // app.get("/calories", function(req,res) {
    //     res.sendFile(path.join(__dirname, "../../public/calories.html"));
    // });

    app.get("/spending", isAuthenticated, function(req,res) {
        res.sendFile(path.join(__dirname, "../../public/spending.html"));           
    });

    
}
