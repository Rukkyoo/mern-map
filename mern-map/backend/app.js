import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get("/api", (req, res) => {
  res.send("Maps API");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

