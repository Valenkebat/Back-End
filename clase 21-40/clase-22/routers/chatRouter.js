import Router from "express";
const server = Router();

server.get("/", (req, res) => {
  if (req.session.user) {
    return res.render("chat.hbs");
  } else return res.redirect("login");
});

export default  server;
