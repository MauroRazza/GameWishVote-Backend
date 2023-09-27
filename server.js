const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 5050;

require("dotenv").config();

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Errore di connessione al server"));

db.once("open", () => {
  console.log("Database MongoDB connected!");
});

app.use('/api', productRoutes);

app.listen(PORT, () => console.log(`Server started and listening on port: ${PORT}`));
