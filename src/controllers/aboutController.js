let getAboutPage = (req, res) => {
    return res.render("about.ejs", {
    })
};

module.exports = {
    getAboutPage: getAboutPage
};