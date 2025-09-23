// src/seed.js
import sequelize from "./config/db.js";
import User from "./models/User.js";
import LostFound from "./models/LostFound.js";
import Place from "./models/Place.js";
import Photo from "./models/Photo.js";
import MissingPerson from "./models/MissingPerson.js";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    await sequelize.sync({ force: true }); // force recreate for demo
    console.log("DB recreated");

    // create demo users
    const pass = await bcrypt.hash("password123", 10);
    const user1 = await User.create({ username: "mihir", email: "mihir@example.com", password: pass });
    const user2 = await User.create({ username: "alice", email: "alice@example.com", password: pass });

    // places
    const p1 = await Place.create({ name: "Manora Point", description: "Beautiful sea view", location: "Seaside" });
    const p2 = await Place.create({ name: "Old Fort", description: "Historic site", location: "Hilltop" });

    // photos
    await Photo.create({ url: "/uploads/manora1.jpg", description: "Sunset at Manora", /* optionally link userId/placeId */ });
    await Photo.create({ url: "/uploads/fort1.jpg", description: "Fort wall" });

    // lost & found
    await LostFound.create({ itemName: "Black Wallet", location: "Temple Entrance", description: "Leather wallet", date: "2025-09-20", contactNo: "9876543210" });
    await LostFound.create({ itemName: "Gold Ring", location: "Market Area", description: "Found near fruit shop", date: "2025-09-18", contactNo: "9123456780" });

    // missing persons
    await MissingPerson.create({ name: "Ravi Kumar", age: 32, gender: "Male", height: "5'8\"", bodyMarks: "Scar on left eyebrow", clothing: "Blue shirt, black jeans", description: "Last seen at bus stand." });
    await MissingPerson.create({ name: "Seema Devi", age: 45, gender: "Female", height: "5'2\"", clothing: "Green saree", description: "Last seen in market" });

    console.log("✅ Seed data created");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
