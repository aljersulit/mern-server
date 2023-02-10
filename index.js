// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Local Imports
const usersRoute = require("./routes/Users");

// Environment variables
const port = process.env.PORT || 3001;
const dataBaseURI = process.env.ATLAS_URI;

//  Connect to Database
mongoose.set("strictQuery", true);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    dataBaseURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Database connection is established.")
  );
}

// Create App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Route
app.use("/users", usersRoute);

app.listen(port, () => console.log(`Connected on port ${port}...`));
