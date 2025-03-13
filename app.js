const express = require("express");
const path = require("path");

const app = express();

// Set the 'views' directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Tells Express to use EJS as the templating engine

// Serve static files from the 'public' directory
app.use(express.static('public'));


// Define the route to render the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
