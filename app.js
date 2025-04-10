const express = require("express");
const path = require("path");

const app = express();
const countries = [
    { name: "USA", code: "US", image: "US.png", flag: "USflag.png" },
    { name: "Australia", code: "AU", image: "AU.png", flag: "AUflag.png" },
    { name: "New Zealand", code: "NZ", image: "NZ.png", flag: "NZflag.png" },
    { name: "Italy", code: "IT", image: "Italy.png", flag: "ITflag.png" },
];

// Set the 'views' directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Tells Express to use EJS as the templating engine

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define the route to render the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

// Define the route to render the contact.ejs file
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

// Render news page and all articles
const newsArticles = [
    {
        title: "'The left is making it better' says left wing reporter",
        date: "March 17, 2025",
        summary: "Summary of the news article. Click below to read more.",
        link: "#"
    },
    {
        title: "'The left is making it worse' says right wing reporter",
        date: "March 17, 2025",
        summary: "Summary of another news article. Click below to read more.",
        link: "#"
    }
];

app.get("/news", (req, res) => {
    res.render("news", { newsArticles });
});

app.get("/nocountry", (req, res) => {
    res.render("nocountry");
})

// Route to render the countries page
app.get("/countries", (req, res) => {
    let countryList = [];
    for (let i = 0; i < countries.length; i++) {
        countryList.push(countries[i].name);
    }
    console.log("Available countries:", countryList.join(", ")); // Debugging output
    res.render("countries", { countries });
});

// Route to render individual country pages dynamically
app.get("/countries/:countryCode", (req, res) => {
    const countryCode = req.params.countryCode.toUpperCase(); // Make case-insensitive
    const country = countries.find(c => c.code === countryCode);

    if (!country) {
        return res.redirect("/nocountry");
    }

    res.render("country", { country });
});

// Renders submit page along with checking if name is valid
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.post("/submit", (req, res) => {
    let { name } = req.body;

    // Trim whitespace
    name=name.trim();

    // Check if name is empty or contains invalid characters
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        return res.render("submit", { name: null, error: "Invalid input. Use only letters." });
    }

    res.render("submit", { name, error: null });
});

app.get("/submit", (req, res) => {
    res.render("submit", { name: "Guest" }); // Default value if accessed directly
});

app.get("/map", (req, res) => {
    res.render("map");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
