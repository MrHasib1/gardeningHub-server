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

const topTrendingTipsData = [
  {
    title: "How I Grow Tomatoes Indoors — Even in Winter!",
    category: "Indoor Gardening",
    difficulty: "Medium",
    description:
      "Learn how to grow juicy tomatoes indoors using sunlight, grow lights, and recycled containers.",
    image: "https://i.ibb.co.com/HpVsbdHZ/tomato.jpg",
    totalLiked: 54,
    createdAt: "2025-09-28T10:30:00Z",
  },
  {
    title: "DIY Compost Bin Using Kitchen Waste",
    category: "Composting",
    difficulty: "Easy",
    description:
      "Turn your kitchen scraps into rich garden compost with this eco-friendly DIY bin tutorial.",
    image: "https://i.ibb.co.com/LD0Gzppy/composed-Bin.jpg",
    totalLiked: 71,
    createdAt: "2025-09-25T09:00:00Z",
  },
  {
    title: "The Secret to Lush Balcony Gardens",
    category: "Balcony Gardening",
    difficulty: "Easy",
    description:
      "Discover how to make your small balcony bloom beautifully with limited sunlight and space.",
    image: "https://i.ibb.co.com/pjSBRkcX/balcony.jpg",
    totalLiked: 63,
    createdAt: "2025-09-23T08:20:00Z",
  },
  {
    title: "5 Plants That Naturally Repel Mosquitoes",
    category: "Plant Care",
    difficulty: "Easy",
    description:
      "Keep your garden pest-free with natural mosquito-repelling plants like basil, lemongrass, and marigold.",
    image: "https://i.ibb.co.com/xt3BK7mD/Plant-Mosquitoes.jpg",
    totalLiked: 82,
    createdAt: "2025-09-20T07:10:00Z",
  },
  {
    title: "Hydroponic Herbs: Grow Without Soil!",
    category: "Hydroponics",
    difficulty: "Hard",
    description:
      "Step-by-step guide to growing herbs in a water-based nutrient system — perfect for urban gardeners.",
    image: "https://i.ibb.co.com/9kpVCfyJ/Herbs.jpg",
    totalLiked: 47,
    createdAt: "2025-09-19T09:30:00Z",
  },
  {
    title: "How to Make Organic Fertilizer at Home",
    category: "Organic Gardening",
    difficulty: "Medium",
    description:
      "Learn to make nutrient-rich organic fertilizer using banana peels, eggshells, and coffee grounds.",
    image: "https://i.ibb.co.com/fGVbFMM0/compost.jpg",
    totalLiked: 69,
    createdAt: "2025-09-18T06:00:00Z",
  },
  {
    title: "How to Propagate Your Plants Easily",
    category: "Plant Propagation",
    difficulty: "Easy",
    description:
      "Learn how to grow new plants from cuttings and seeds — a fun and cost-effective way to expand your garden.",
    image: "https://i.ibb.co.com/gLcfTWB4/propCut.jpg",
    totalLiked: 58,
    createdAt: "2025-09-17T11:00:00Z",
  },
  {
    title: "Top 5 Low-Maintenance Indoor Plants",
    category: "Indoor Gardening",
    difficulty: "Easy",
    description:
      "Perfect for busy people! Discover low-maintenance plants like Snake Plant, ZZ Plant, and Pothos.",
    image: "https://i.ibb.co.com/9xLpZZB/low-Indoor.jpg",
    totalLiked: 75,
    createdAt: "2025-09-16T10:40:00Z",
  },
  {
    title: "Rainwater Harvesting for Small Gardens",
    category: "Sustainable Gardening",
    difficulty: "Medium",
    description:
      "Save water and keep your plants hydrated by collecting and using rainwater efficiently.",
    image: "https://i.ibb.co.com/wZzFK1Hb/rain.jpg",
    totalLiked: 52,
    createdAt: "2025-09-15T08:30:00Z",
  },
  {
    title: "Best Companion Plants for a Healthy Garden",
    category: "Plant Care",
    difficulty: "Medium",
    description:
      "Pair plants wisely! Learn which plants grow better together for healthier yields and fewer pests.",
    image: "https://i.ibb.co.com/wrSYxxRZ/compainon-Plant.jpg",
    totalLiked: 66,
    createdAt: "2025-09-14T09:45:00Z",
  },
];

const exploreGardenersData = [
  {
    name: "Anika Rahman",
    age: 28,
    gender: "Female",
    status: "active",
    experiences: ["Balcony Gardening", "Herbs", "Organic Soil Mix"],
    image: "https://i.ibb.co.com/zWDVpyzF/e-1.jpg",
    totalSharedTips: 14,
    location: "Dhaka, Bangladesh",
    bio: "Passionate about sustainable balcony gardens and indoor herbs.",
  },
  {
    name: "Rafiq Hasan",
    age: 35,
    gender: "Male",
    status: "active",
    experiences: ["Vegetable Gardening", "Composting", "Hydroponics"],
    image:
      "https://i.ibb.co.com/9kDsN6Sr/happy-young-man-gardening-backyard-600w-191098442.jpg",
    totalSharedTips: 22,
    location: "Chattogram, Bangladesh",
    bio: "Expert in organic composting and hydroponic farming systems.",
  },
  {
    name: "Tania Akter",
    age: 26,
    gender: "Female",
    status: "active",
    experiences: ["Indoor Plants", "Succulents", "DIY Pots"],
    image:
      "https://i.ibb.co.com/Xfyt5C0j/57716888-portrait-of-beautiful-40-years-old-woman-gardening-on-sunny-day-in-the-garden.jpg",
    totalSharedTips: 18,
    location: "Sylhet, Bangladesh",
    bio: "Loves creating decorative pots and maintaining low-light plants.",
  },
  {
    name: "Imran Kabir",
    age: 40,
    gender: "Male",
    status: "active",
    experiences: ["Fruit Gardening", "Soil Fertility", "Pest Control"],
    image: "https://i.ibb.co.com/HLZjm8XG/e-4.jpg",
    totalSharedTips: 30,
    location: "Rajshahi, Bangladesh",
    bio: "Fruit tree specialist with 15+ years of soil management experience.",
  },
  {
    name: "Nusrat Jahan",
    age: 31,
    gender: "Female",
    status: "active",
    experiences: ["Rooftop Gardening", "Organic Farming", "Seed Saving"],
    image: "https://i.ibb.co.com/1JRcvFjP/e-5.jpg",
    totalSharedTips: 25,
    location: "Khulna, Bangladesh",
    bio: "Advocates for urban rooftop gardens and local organic food sources.",
  },
  {
    name: "Sabbir Ahmed",
    age: 29,
    gender: "Male",
    status: "active",
    experiences: ["Vertical Gardening", "Irrigation Setup", "Compost Tea"],
    image: "https://i.ibb.co.com/B565Z7TC/e-6.jpg",
    totalSharedTips: 16,
    location: "Barishal, Bangladesh",
    bio: "Helps beginners build small-space gardens with vertical structures.",
  },
  {
    name: "Farzana Begum",
    age: 33,
    gender: "Female",
    status: "inactive",
    experiences: ["Herbal Plants", "Propagation", "Soil Care"],
    image: "https://i.ibb.co.com/nN928GYC/e-7.jpg",
    totalSharedTips: 12,
    location: "Rangpur, Bangladesh",
    bio: "Specializes in medicinal herbs and organic propagation methods.",
  },
  {
    name: "Arif Chowdhury",
    age: 37,
    gender: "Male",
    status: "inactive",
    experiences: ["Composting", "Greenhouse Maintenance"],
    image: "https://i.ibb.co.com/bpnrbx7/e-8.jpg",
    totalSharedTips: 8,
    location: "Mymensingh, Bangladesh",
    bio: "Greenhouse maintenance expert focusing on eco-friendly compost systems.",
  },
  {
    name: "Sharmin Sultana",
    age: 24,
    gender: "Female",
    status: "inactive",
    experiences: ["Cactus Care", "Indoor Lighting Setup"],
    image: "https://i.ibb.co.com/7tJR5sv9/ee-9.jpg",
    totalSharedTips: 10,
    location: "Dhaka, Bangladesh",
    bio: "Loves creating minimalist cactus collections for apartment dwellers.",
  },
  {
    name: "Hasan Mahmud",
    age: 42,
    gender: "Male",
    status: "inactive",
    experiences: ["Hydroponics", "Automation in Gardening"],
    image: "https://i.ibb.co.com/1fLk9BJp/e-10.jpg",
    totalSharedTips: 15,
    location: "Gazipur, Bangladesh",
    bio: "Developing automated irrigation systems for hydroponic gardens.",
  },
  {
    name: "Lamia Noor",
    age: 27,
    gender: "Female",
    status: "active",
    experiences: ["Flower Gardening", "Compost Making", "Butterfly Gardens"],
    image:
      "https://i.ibb.co.com/391s7F0s/cheerful-woman-gardening-at-home-in-springtime-KGN32-X.jpg",
    totalSharedTips: 19,
    location: "Cumilla, Bangladesh",
    bio: "Creates colorful flower beds and promotes pollinator-friendly gardening.",
  },
  {
    name: "Kamrul Islam",
    age: 38,
    gender: "Male",
    status: "inactive",
    experiences: [
      "Tree Plantation",
      "Seed Germination",
      "Rainwater Harvesting",
    ],
    image: "https://i.ibb.co.com/JR5ffbyK/maxresdefault.jpg",
    totalSharedTips: 11,
    location: "Jessore, Bangladesh",
    bio: "Focuses on tree planting campaigns and rainwater-based irrigation systems.",
  },
];

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const featureGardeners = client.db("gardeningDB").collection("gardeners");
    const topTrendingTips = client.db("gardeningDB").collection("trendingTips");
    const exploreGardeners = client
      .db("gardeningDB")
      .collection("exploreGardener");
    const shareGardeners = client.db("gardeningDB").collection("shareTips");

    // insert gardeners json data
    const count = await featureGardeners.countDocuments();
    if (count === 0) {
      await featureGardeners.insertMany(gardenersData);
      console.log("explore gardeners Initial data inserted");
    } else {
      console.log("explore gardeners Data already exists, skipping insert");
    }

    app.get("/featureGarden", async (req, res) => {
      const activeGardeners = await featureGardeners
        .find({ status: "active" })
        .limit(6)
        .toArray();
      res.send(activeGardeners);
    });

    // insert trendingTips json data
    const count1 = await topTrendingTips.countDocuments();
    if (count1 === 0) {
      await topTrendingTips.insertMany(topTrendingTipsData);
      console.log("top Trending Tips Initial data inserted");
    } else {
      console.log("top Trending Tips Data already exists, skipping insert");
    }

    app.get("/trendingTips", async (req, res) => {
      const topTip = await topTrendingTips
        .find()
        .limit(6)
        .sort({ totalLiked: -1 })
        .toArray();

      res.send(topTip);
    });

    // explore gardeners
    const count2 = await exploreGardeners.countDocuments();
    if (count2 === 0) {
      await exploreGardeners.insertMany(exploreGardenersData);
      console.log("explore gardeners Initial data inserted");
    } else {
      console.log("explore gardeners Data already exists, skipping insert");
    }

    app.get("/exploreGardeners", async (req, res) => {
      const activeGardeners = await exploreGardeners.find().toArray();
      res.send(activeGardeners);
    });

    // share gardeners db receive
    app.post("/shareTips", async (req, res) => {
      const newTips = req.body;
      // console.log(newTips);
      const result = await shareGardeners.insertOne(newTips);
      res.send(result);
    });

    app.get("/browseTips", async (req, res) => {
      const newBrowseTips = await shareGardeners.find().toArray();
      res.send(newBrowseTips);
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
