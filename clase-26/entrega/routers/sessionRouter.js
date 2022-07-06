const server = require("express").Router();
// PASSPORT
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const usuarios = [];

//---------------------------------------------------//
// PASSPORT REGISTER
passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {

      const usuario = usuarios.find((usuario) => usuario.username == username);
      if (usuario) {
        return done("user already registered");
      }

      const user = {
        username,
        password,
      };
      usuarios.push(user);

      return done(null, user);
    }
  )
);

//---------------------------------------------------//
// PASSPORT LOGIN
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    const user = usuarios.find((usuario) => usuario.username == username);
    if (!user) {
      return done(null, false);
    }

    if (user.password != password) {
      return done(null, false);
    }

    user.contador = 0;

    return done(null, user);
  })
);

//---------------------------------------------------//
// SERIALIZAR Y DESERIALIZAR

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  const usuario = usuarios.find((usuario) => usuario.username == username);
  done(null, usuario);
});

//---------------------------------------------------//
// MIDDLEWARES DE PASSPORT
server.use(passport.initialize());
server.use(passport.session());

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

//---------------------------------------------------//
// RUTAS REGISTRO

server.get("/register", (req, res) => {
  res.render("register.hbs");
});

server.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
    successRedirect: "/",
  })
  
);
console.log(usuarios)

server.get("failregister", (req, res) => {
  res.render("register-error.hbs");
});

//---------------------------------------------------//
// RUTAS LOGIN

server.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/datos')
  }
  res.render("login.hbs");
});

server.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/index",
  })
);

server.get("/faillogin", (req, res) => {
  res.render("login-error.hbs");
});

//---------------------------------------------------//
// RUTAS DATOS

server.get("/datos", isAuth, (req, res) => {
  if (!req.user.contador) {
    req.user.contador = 0;
  }

  req.user.contador++;

  res.render("index.hbs", {
    datos: usuarios.find((usuario) => usuario.username == req.user.username),
    contador: req.user.contador,
  });
});

//---------------------------------------------------//
// RUTAS LOGOUT

server.get("/logout", (req, res) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

//---------------------------------------------------//
// RUTAS INICIO

server.get("/", isAuth, (req, res) => {
  res.redirect("/datos");
});


module.exports = server;
