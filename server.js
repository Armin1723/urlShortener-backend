const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the URL Shortener." });
});

app.use('/api', require('./routes/apiRoutes'));

app.listen(3000, () => {
    try {
        console.log("Server is running on port 3000");
    } catch (error) {
        console.error("Error in running application", error);
        
    }
});