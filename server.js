import cors from "cors";
import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import contactRoutes from './routes/contactRoute.js'

const app = express();

const port = process.env.PORT;

//middelware
app.use(express.json());
app.use(
  cors({
    origin: "https://tanisha-bisht.netlify.app",
  })
);

//restroute

app.get("/", (req, res) => {
  res.send("portfolio backend is running.");
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();

app.use('/api/contact' , contactRoutes )