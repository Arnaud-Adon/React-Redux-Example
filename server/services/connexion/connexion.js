const mongoose = require("mongoose");
const config = require("../../config");
const databaseUri = `mongodb+srv://${process.env.BDD_USER}:${process.env.BDD_PASSWORD}@cluster0.himy6.mongodb.net/${process.env.BDD_DBNAME}?retryWrites=true&w=majority`;
console.log("databaseUri", databaseUri);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports = () => {
  mongoose.connect(databaseUri, options);

  mongoose.connection
    .on("error", (error) => console.log("erreur de connexion", error))
    .once("open", () => {
      console.log(
        "------ Connecté à MongoDB Atlas pour la base de données ------"
      );
    });
};
