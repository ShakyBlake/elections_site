const express = require("express");
const path = require("path");

const app = express();

// Set the 'views' directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Tells Express to use EJS as the templating engine

// Serve static files from the 'public' directory
app.use(express.static('public'));

const countries = [
    { name: "USA", code: "US", image: "US.png" },
    { name: "Australia", code: "AU", image: "AU.png" },
    { name: "New Zealand", code: "NZ", image: "NZ.png" },
    { name: "Italy", code: "IT", image: "Italy.png" },
];

const countryflag = [
    { name: "USAflag", code: "USflag", image: "USflag.png" },
    { name: "Australiaflag", code: "AUflag", image: "AUflag.png" },
    { name: "New Zealandflag", code: "NZflag", image: "NZflag.png" },
    { name: "Italyflag", code: "ITflag", image: "ITflag.png" },
];

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
        title: "News Headline 1",
        date: "March 17, 2025",
        summary: "Summary of the news article. Click below to read more.",
        link: "#"
    },
    {
        title: "News Headline 2",
        date: "March 17, 2025",
        summary: "Summary of another news article. Click below to read more.",
        link: "#"
    }
];

app.get("/news", (req, res) => {
    res.render("news", { newsArticles });
});

// Route to render the countries page
app.get("/countries", (req, res) => {
    res.render("countries", { countries, countryflag }); // Pass both arrays
});

// Route to render individual country pages dynamically
app.get("/countries/:countryCode", (req, res) => {
    const country = countries.find(c => c.code === req.params.countryCode);
    if (!country) {
        return res.status(404).send("Country not found");
    }
    res.render("country", { country });
});

// Renders submit page along with checking if name is valid
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.post("/submit", (req, res) => {
    const { name } = req.body;
    res.render("submit", { name: name || "Guest" }); // Fallback if name is empty
});

app.get("/submit", (req, res) => {
    res.render("submit", { name: "Guest" }); // Default value if accessed directly
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
