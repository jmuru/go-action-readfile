const uri = "mongodb+srv://josephmuruguru:yRSHnTn0jSf66Ls4@blog-content.rqepisu.mongodb.net/blog-content";
const username = "josephmuruguru";

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

async function run() {
  try {
    await client.connect();
    await client.db("blog-content").collection("posts").insertOne(
      {
        "Username": username,
        "Content": blah,
      }
    )
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
