const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");
const cartRouter = require("./routes/cartRouter");
const ratingRouter = require("./routes/ratingRouter");
const contactUsRouter = require("./routes/contactUsRouter");
const vendorRouter = require("./routes/vendorRouter");
const productRouter = require("./routes/productRouter");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const methodNotAllowed = require("./utils/methodNotAllowed");
const PORT = 4000;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/contact-us", contactUsRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/product", productRouter);

app.use(errorHandler);
app.use(methodNotAllowed);
app.use(notFound);

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOO_URI);
    console.log(`DB is connected!`);
    app.listen(PORT, () => {
      console.log(`Server is listening on  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(
      `Couldn't connect to DB due to: Bad or no network which is ${error.message}`
    );
  }
};
start();
