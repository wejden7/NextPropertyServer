const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).json({ status: "Backend running." })
);

app.use((error, req, res, next) =>
  res.status(404).json({
    status: "La connexion a échouée, merci de réessayer",
    error: error,
  })
);

//* 404 Route
app.use((req, res) => res.status(404).json({ status: "Page not found." }));

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
