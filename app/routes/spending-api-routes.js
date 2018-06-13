var path = require("path");

var db = require("../models");

module.exports = function(app) {

    // GET route for getting all Spending info
    app.get("/api/spending", function(req, res) {
        db.Spending.findAll().then(function(dbSpending) {
            res.json(dbSpending);
        });
    });

    // GET route for getting spending data based on category
    app.get("/api/spending/:category", function(req, res) {
        db.Spending.findAll({
            where: {
                category: req.params.category
            }
        }).then(function(dbSpending) {
            res.json(dbSpending);
        });
    });

    // POST route for saving a new entry
    app.post("/api/spending", function(req, res) {
        db.Spending.create(req.body).then(function(dbSpending) {
            res.json(dbSpending);
        });
    });

    // DELETE route for deleting spending data
    app.delete("/api/spending/:id", function(req, res) {
        db.Spending.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbSpending) {
        res.json(dbSpending);
        });
    });

    // PUT route for updating spending data
    app.put("/api/spending", function(req, res) {
        db.Spending.update(
        req.body,
        {
            where: {
            id: req.body.id
            }
        }).then(function(dbSpending) {
        res.json(dbSpending);
        });
    });

};

