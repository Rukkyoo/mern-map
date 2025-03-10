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

// Route computation endpoint
app.get("/api/autocomplete", async (req, res) => {
  const { input } = req.query; // Getting the input from the query string
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching autocomplete suggestions" });
    console.log(error);
  }
});

// Route computation endpoint
app.post("/api/route", async (req, res) => {
  const { origin, destination } = req.body; // Getting the origin and destination from the request body
  const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`;

  const requestBody = {
    origin: {
      address: origin, // where the user is coming from
    },
    destination: {
      address: destination, // where the user is going to
    },
    travelMode: "DRIVE", // the mode of travel
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error computing route" });
    console.log(error, error.response ? error.response.data : error.message);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
