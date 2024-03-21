const app = require("./src/Services");
const dbConnection = require("./Mongo/MongoConnection");
const port = 3001;

//password 56Q3oYCvbkQTBn2Y
// username singh80020
// link mongodb+srv://singh80020:56Q3oYCvbkQTBn2Y@my-lappy.p4sxzae.mongodb.net/

app.get("/", (req, res) => {
  res.send("Welcome to Mongo");
});

app.listen(port, async () => {
  await dbConnection();
  console.log(` app listening on port ${port}`);
});
