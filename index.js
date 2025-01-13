const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//Parse Application/json request
app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res.status(200).json({
    message: "berhasil",
  });
});

//Route note
const noteRouter = require("./route/noteRouter");
app.use("/api/notes", noteRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Berjalan Pada http://localhost:${process.env.PORT}`);
});
