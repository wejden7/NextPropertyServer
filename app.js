import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./database.js";
import JwtStrategy from "./jwt_strategy.js";
import passport from "passport";

export const authMiddleware = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

import routerAuth from "./src/routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = 3006;

passport.use(JwtStrategy);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).json({ status: "Backend running." })
);

app.use(routerAuth);

app.use(authMiddleware);
app.get("/new", (req, res) => res.status(200).json("auth running"));


//* Error Router
app.use((error, req, res, next) =>
  res.status(404).json({
    status: "La connexion a échouée, merci de réessayer",
    error: error,
  })
);

//* Not Found Router
app.use((req, res) => res.status(404).json({ status: "Page not found." }));

// Listen for process termination signals
process.on("SIGINT", () => {
  console.log("Received SIGINT signal. Closing connection pool...");
  pool.end((err) => {
    if (err) {
      console.error("Error closing connection pool:", err);
    } else {
      console.log("Connection pool closed.");
      process.exit(0); // Exit the process gracefully
    }
  });
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal. Closing connection pool...");
  pool.end((err) => {
    if (err) {
      console.error("Error closing connection pool:", err);
    } else {
      console.log("Connection pool closed.");
      process.exit(0); // Exit the process gracefully
    }
  });
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release();
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
