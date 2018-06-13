var path = require('path');

module.exports = function(app, passport) {
 
    app.get('/signup', function(req,res) {
        res.sendFile(path.join(__dirname, "../../public/signup.html"));           
    });
 
    app.get('/signin', function(req,res) {
        res.sendFile(path.join(__dirname, "../../public/signin.html"));           
    });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
    
            failureRedirect: '/signup'
        }
    ));

    app.get('/logout', function(req, res) {
 
        req.session.destroy(function(err) {
     
            res.redirect('/');
     
        });
     
    });

    app.post('/signin', passport.authenticate('local-signin', {

            successRedirect: '/',

            failureRedirect: '/signup'
        }

    ));


    function isLoggedIn(req, res, next) { 
        if (req.isAuthenticated())         
            return next();             
        res.redirect('/signin');
    }

}