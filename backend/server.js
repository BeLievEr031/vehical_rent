import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import vehicalRouter from "./routes/vehicalRouter.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "dist")));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/vehical", vehicalRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  dbConnect();
  console.log("Connected to the server " + PORT);
});
