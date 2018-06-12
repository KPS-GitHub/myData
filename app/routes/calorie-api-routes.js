var path = require("path");

modules.exports = function(app) {

    // get route for getting all calorie info
    app.get("/api/calories", function(req, res) {
        db.Calorie.findAll().then(function(dbCalorie) {
            res.json(dbCalorie);
        });
    });

    
};