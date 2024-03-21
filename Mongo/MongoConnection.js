// const mongoose = require("mongoose");

// module.exports = async () => {
//   try {
//     await mongoose.set("strictQuery", false);
//     await mongoose.connect(
//       "mongodb+srv://singh80020:56Q3oYCvbkQTBn2Y@my-lappy.p4sxzae.mongodb.net/",
//       { replicaSet: "rs0", readPreference: "primary", w: "majority" }
//     );
//     console.log("connected to db");
//   } catch (error) {
//     console.log(error);
//     process.exit();
//   }
// };

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://singh80020:56Q3oYCvbkQTBn2Y@my-lappy.p4sxzae.mongodb.net/?retryWrites=true&w=majority&appName=my-lappy";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
module.exports = { run };
