const express = require("express");
var cors = require("cors");
const app = express();
const path = require("path");

const visitorsRouter = require("./routes/visitors.route");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(express.json());
app.use("/api", visitorsRouter);

const staticPath = path.join(__dirname, "./client/build");

if (process.env.NODE_ENV == "production") {
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server is up to port no " + port);
});
