import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from DikaDika",
  });
});

// For UserRoutes
app.use("/api/user", UserRoutes)

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173' || "https://fitness-tracker-client-alpha.vercel.app/", // Update this as needed
  credentials: true,  // If your frontend is using cookies for authentication, set this to true
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']  // Add 'Authorization' if using auth tokens
}));

// MongoDb connection function
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => console.log("Connected to MongoDb"))
    .catch((err) => {
      console.log(err);
    });
};

// Server Function
const startServer = async () => {
  try {
    connectDB();
    app.listen(7890, () => console.log("Server connected successfully"));
  } catch (err) {
    console.log(err);
  }
};

startServer();
