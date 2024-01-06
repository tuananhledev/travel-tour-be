import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

// import neo4j from 'neo4j-driver'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};
//database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connected failed");
  }
};







// // Create a Neo4j driver instance
// const neo4jUri = process.env.NEO4J_URI;
// const neo4jUser = process.env.NEO4J_USER;
// const neo4jPassword = process.env.NEO4J_PASSWORD;
// const driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));

// // Check Neo4j connection
// const session = driver.session();
// session.run("MATCH (n) RETURN n LIMIT 1")
//   .then(() => {
//     console.log("Connected to Neo4j database successfully");
//     session.close();
//   })
//   .catch(error => {
//     console.error("Failed to connect to Neo4j database:", error);
//     session.close();
//   });






//middle ware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.listen(port, () => {
  connect();
  // session();
  console.log("server listening on port", port);
});
