const express = require("express");
const app = express();
const port = 3001;

//password 56Q3oYCvbkQTBn2Y
// username singh80020
// link mongodb+srv://singh80020:<password>@my-lappy.p4sxzae.mongodb.net/

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`, process.env.DATA);
});
