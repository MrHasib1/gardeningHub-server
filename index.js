const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middlewire
app.use(cors());
app.use(express.json());

require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7qxesea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const gardenersData = [
  {
    name: "Rahim Uddin",
    location: "Dhaka",
    rating: 4.8,
    status: "active",
    specialty: "Rose Gardening",
    image: "https://i.ibb.co.com/PsQ5gdZG/gardener-1.jpg",
  },
  {
    name: "Karim Ali",
    location: "Chittagong",
    rating: 4.5,
    status: "inactive",
    specialty: "Vegetable Gardening",
    image: "https://i.ibb.co.com/b501MbcM/gardener-2.jpg",
  },
  {
    name: "Sumon Hossain",
    location: "Sylhet",
    rating: 4.7,
    status: "active",
    specialty: "Fruit Gardening",
    image: "https://i.ibb.co.com/k6XWX22z/gardener-3.jpg",
  },
  {
    name: "Lamia Akter",
    location: "Rajshahi",
    rating: 4.6,
    status: "active",
    specialty: "Herbal Plants",
    image: "https://i.ibb.co.com/5W8YkbnW/gardener-8.jpg",
  },
  {
    name: "Rashed Khan",
    location: "Khulna",
    rating: 4.9,
    status: "active",
    specialty: "Indoor Gardening",
    image: "https://i.ibb.co.com/tTc6F2y6/gardener-4.jpg",
  },
  {
    name: "Mehedi Hasan",
    location: "Barishal",
    rating: 4.4,
    status: "active",
    specialty: "Hydroponics",
    image: "https://i.ibb.co.com/yc8WYbPn/gardener-5.jpg",
  },
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    rating: 4.8,
    status: "inactive",
    specialty: "Cactus & Succulents",
    image: "https://i.ibb.co.com/5grSWQJR/gardener-9.jpg",
  },
  {
    name: "Azizur Rahman",
    location: "Mymensingh",
    rating: 4.3,
    status: "inactive",
    specialty: "Flower Gardening",
    image: "https://i.ibb.co.com/ZRTZQ4Yn/gardener-6.png",
  },
  {
    name: "Shahina Parvin",
    location: "Comilla",
    rating: 4.7,
    status: "active",
    specialty: "Bonsai Gardening",
    image: "https://i.ibb.co.com/ksFW9FdN/gardener-10.jpg",
  },
  {
    name: "Tanvir Ahmed",
    location: "Rangpur",
    rating: 4.6,
    status: "inactive",
    specialty: "Vertical Gardening",
    image: "https://i.ibb.co.com/gL3m0Q2k/gardener-7.jpg",
  },
];

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const exploreGardeners = client.db("gardeningDB").collection("gardeners");

    // insert gardeners json data
    const count = await exploreGardeners.countDocuments();
    if (count === 0) {
      await exploreGardeners.insertMany(gardenersData);
      console.log("Initial data inserted");
    } else {
      console.log(" Data already exists, skipping insert");
    }

    app.get("/exploreGarden", async (req, res) => {
      const activeGardeners = await exploreGardeners
        .find({ status: "active" })
        .limit(6)
        .toArray();
      res.json(activeGardeners);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Garding Hub server is coming");
});

app.listen(port, () => {
  console.log(`Gardening server running on port ${port}`);
});
