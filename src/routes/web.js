import express from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import homePageController from "../controllers/homePageController";
import initPassportLocal from "../controllers/passportLocalController";
import aboutController from "../controllers/aboutController";
import serviceController from "../controllers/serviceController";
import contactController from "../controllers/contactController";
/*
init passport routes
 */
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/about", aboutController.getAboutPage);
    router.get("/service", serviceController.getServicePage);
    router.get("/contact", contactController.getContactPage);

    router.get("/", loginController.checkLoggedIn, homePageController.getHomePage);
    router.post("/logout", loginController.postLogOut);

    router.get("/register", registerController.getRegisterPage );
    router.post("/register-new-user", registerController.createNewUser);

    router.get("/login",loginController.checkLoggedOut, loginController.getLoginPage);
    router.post("/login", loginController.handleLogin);
    return app.use("/", router);
};

module.exports = initWebRoutes;