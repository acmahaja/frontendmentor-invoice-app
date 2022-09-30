const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

const Invoice = require("./model/Invoice");
const User = require("./model/User");
const { join } = require("path");
const {v4 : uuid} = require('uuid')


app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE
      : "mongodb://localhost:27017/invoice-app"
  )
  .then(() => {
    console.log(`🌿[database]: Connected to database`);
  });

app.use(express.static(path.resolve(__dirname, "../client/build")));

async function verifyAccessToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    const decoded = await jwt.verify(token, process.env.SECRET_HASH);
  } catch (error) {
    res.json({ status: "error", error: "Session error" });
  }
  next();
}

app.get("/api/invoice", verifyAccessToken, async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRET_HASH);

    const user = await User.findOne({
      email: decoded.email,
    });

    const invoices = await Invoice.find({
      user: user._id
    });

    res.json({ status: "ok", invoices: invoices });
  } catch (error) {
    res.json({ status: "error", error: "Something Broke" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.json({ status: "error", error: "Invalid login" });
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (checkPassword) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_HASH
    );
    res.json({ status: "ok", token: token });
  } else {
    res.json({ status: "error", error: "Invalid login" });
  }
});

app.post("/api/register", async (req, res) => {
  let user = User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.json({ status: "error", error: "Invalid login" });
  }

  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      Number.parseInt(process.env.SALT)
    );
    user = new User(req.body);
    await user.save();

    const string = uuid()
    
    for (let int = 0; int < 5; int++) {
        const invoice = new Invoice({
            id: string.substring(-6),
            user: user.id,
            status: 'draft'
        })                
        await invoice.save()
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.log(`⚠️[server]: Error!\n${error}`);
    res.json({ status: "error", error: "Invalid login" });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "⚡[server]: Hello from server!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`⚡[server]: Server is listening on port ${port}`);
});
