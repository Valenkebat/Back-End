import Router from "express";
const server = Router();

import path from 'path'
import Contenedor from "../class/contenedor.js"

const productos = new Contenedor(path.join(__dirname, '../data/productos.json'));

server.get("/", (req, res) => {
  if (req.session.user) {
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("index.hbs", {
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login");
});

server.post("/", (req, res) => {
  if (req.session.user) {
    productos.save(req.body);
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("index.hbs", {
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login");
});

export default server;
