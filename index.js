const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const authRouter = require("./routes/auth");
const app = express();
const port = 3000;
 
dotenv.config();
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: "20mb",
        extended: true,
    })
);
  
app.use("/api/products", productRouter);
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(process.env.PORT || port, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
);
