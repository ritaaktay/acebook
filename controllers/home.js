const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Meowbook" });
  },
};

module.exports = HomeController;
