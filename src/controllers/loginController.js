import passport from "passport";
import db from "../config/connectDB";

let getLoginPage = (req, res) => {
    return res.render("login.ejs");
};

let handleLogin = (req, res, next) => {
    passport.authenticate("localLogin", function(error, user, info) {
        if (error) {
           return res.status(500).json(error);
        }
        if (!user) {
            db.query("UPDATE users set attempts=attempts-1 where email = ?", info.message, function(error, rows) {
                if (error) throw error;
            });
            return res.status(401).json(info.message);
        }
        if (user) {
            db.query("UPDATE users set attempts=3 where email = ?", info.message, function(error, rows) {
                if (error) throw error;
            });
        }

        req.login(user, function (err) {
             if (err) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(user);
            }
        });
    })(req, res, next);
};

let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) =>{
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

module.exports = {
    getLoginPage: getLoginPage,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};