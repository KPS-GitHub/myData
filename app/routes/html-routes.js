var path = require("path");
var db = require("../models");

module.exports = function(app) {

    function loggedIn(req,res) {

        app.get("/", function(req,res) {
            if (req.user) {
                res.sendFile(path.join(__dirname, "../../public/home.html"));
            } else {
                res.render('signin');
            }
        });
    }
 

        // app.get("/calories", function(req,res) {
        //     res.sendFile(path.join(__dirname, "../../public/calories.html"));
        // });

        app.get("/spending", function(req,res) {
            res.sendFile(path.join(__dirname, "../../public/spending.html"));
        });

    

}
