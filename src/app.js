
// inizializzo tutto il package json con npm init -y
// npm install nodemon@1.18.5 -g istallato come globale nel mio ambiente di sviluppo e non nel singolo progetto
// npm i request@2.88.0  modulo per fare request http

//npm i express@4.16.4

//nodemon src/app.js -e js,hbs        in modo che nodemon veda i cambiamenti sulle varie estensioni

const { response } = require("express");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//SE USO HAROKU PRENDO LA VARIABILE ALTRIMENTI PRENDO 3000
const port = process.env.PORT || 3000

//varaibili node js che  ci dicono dove siamo
console.log(__dirname);
console.log(__filename);
//per ristartare il server ogni volta che faccio i cambiamenti , ad esempio una nuova rotta , posso fare nodemon src/app.js

//Define path for static and dinamic html for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location app.set setta la nostra la nostra app
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Set up static directory to serve ---> dovrò solo mettere l'html statico nella cartella public e ci sarà bisogno di app.get
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  //passo la view hbs e l'oggetto che gli voglio passare
  res.render("index", {
    title: "Weather App",
    name: "Plinio",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Plinio",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "We offer quick support",
    name: "Plinio",
  });
});

// metodo da applicare quando prendo una rotta ad esempio app.com/about

//http://localhost:3000/weather?address=roma  API che viene chiamata dal browser
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Your must provide an address",
    });
  }
  geocode(req.query.address, (error1, { lat, long, location } = {}) => {
    if (error1) {
      return res.send({ error: error1 });
    }

    forecast(lat, long, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        forecast: data,
        locations: location,
      });
    });
  });
});

//solo un res.send ci può essere per ogni path , altrimenti va in errore
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "your must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help article not found",
    name: "Plinio",
  });
});

//da mettere ala fine per la gestione delle pagine 404  * anything that hasn't been match so far
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found",
    name: "Plinio",
  });
});

//per mettere in locale il server app an running  localhost:3000
app.listen(port, () => {
  console.log("Server up port " + port);
});
