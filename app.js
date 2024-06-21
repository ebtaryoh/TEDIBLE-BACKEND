const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const foodRouter = require("./routes/foodRouter");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const restaurantRouter = require("./routes/restaurantRouter");
const orderRouter = require("./routes/orderRouter");
const subRouter = require("./routes/subRouter");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const methodNotAllowed = require("./utils/methodNotAllowed");
const PORT = 3000
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/category", categoryRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/order", orderRouter);
app.use("api/subscribe", subRouter);
app.use(errorHandler);
app.use(methodNotAllowed);
app.use(notFound);

// app.use((req, res) => {
//   res.send(`Route Not Found`);
// });

// 4nrQVSRlh7T8LANR

// mongodb+srv://ibitayoakinnibosun:4nrQVSRlh7T8LANR@cluster0.kftqa6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOO_URI);
    console.log(`DB is connected!`);
    app.listen(PORT, () => {
      console.log(`Server is listening on  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(
      `Couldn't connect to DB due to: Bad or no network which is ${error.message} `
    );
  }
};
start();
