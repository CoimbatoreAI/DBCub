require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');

const categories = [
    {
        name: "TShirts",
        subcategories: [
            { name: "Oversized", subcategories: ["Cotton", "Poly-Cotton", "Graphic"] },
            { name: "Full Sleeve", subcategories: ["Ribbed", "Plain", "Hooded"] },
            { name: "Polo", subcategories: ["Classic", "Pique", "Slim Fit"] },
            { name: "Zipper", subcategories: ["Quarter Zip", "Full Zip"] }
        ]
    },
    {
        name: "Shirts",
        subcategories: [
            { name: "Linen", subcategories: ["Pure Linen", "Linen Blend"] },
            { name: "Viscose", subcategories: ["Rayon", "Satin Finish"] },
            { name: "Back Print", subcategories: ["Streetwear", "Artistic"] },
            { name: "Party Wear", subcategories: ["Shiny", "Embroidered"] },
            { name: "Half Sleeve", subcategories: ["Cuban Collar", "Regular"] },
            { name: "Plus Size", subcategories: ["XXL+", "Comfort Fit"] }
        ]
    },
    {
        name: "Pants",
        subcategories: [
            { name: "Jeans", subcategories: ["Slim", "Straight", "Baggy"] },
            { name: "Linen Pants", subcategories: ["Drawstring", "Belted"] },
            { name: "Formal Pants", subcategories: ["Trousers", "Chinos"] },
            { name: "Track Pants", subcategories: ["Cuffed", "Open Hem"] }
        ]
    },
    {
        name: "Sportswear",
        subcategories: [
            { name: "Active T-Shirts", subcategories: ["Dry-Fit", "Compression"] },
            { name: "Jerseys", subcategories: ["Football", "Cricket"] },
            { name: "Active Shorts", subcategories: ["Training", "Running"] },
            { name: "Sleeveless", subcategories: ["Tank Tops", "Stringers"] },
            { name: "Track Pants", subcategories: ["Performance", "Joggers"] }
        ]
    },
    {
        name: "Innerwear",
        subcategories: [
            { name: "Trunks", subcategories: ["Cotton", "Modal"] },
            { name: "Briefs", subcategories: ["Classic", "Sport"] },
            { name: "Upper", subcategories: ["Vests", "Undershirts"] }
        ]
    },
    {
        name: "Cricket",
        subcategories: [
            { name: "Cricket Bats", subcategories: ["English Willow", "Kashmir Willow"] },
            { name: "Cricket Balls", subcategories: ["Leather", "Tennis"] },
            { name: "Accessories", subcategories: ["Gloves", "Pads", "Helmets"] }
        ]
    },
    {
        name: "Football",
        subcategories: [
            { name: "Football", subcategories: ["Match Ball", "Training Ball"] },
            { name: "Accessories", subcategories: ["Shin Guards", "Grips"] }
        ]
    },
    {
        name: "Badminton",
        subcategories: [
            { name: "Rackets", subcategories: ["Carbon Fiber", "Aluminum"] },
            { name: "Shuttle", subcategories: ["Feather", "Nylon"] }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        await Category.deleteMany({});
        console.log("Existing categories cleared.");

        await Category.insertMany(categories);
        console.log("Categories seeded successfully!");

        process.exit();
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
};

seedDB();
