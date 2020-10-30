const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const app = express();
const cors = require("cors");

const router = require("./route");
const databaseConnexion = require("./services/connexion/connexion");

databaseConnexion();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

const port = 3090;
const server = http.createServer(app);
router(app);
server.listen(port);
console.log(`ecoute sur le port ${port}`);
