const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const { urlencoded } = require("body-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const tenantRoutes = require("./routes/tenantRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middle-ware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`<h1>Server is connected</h1>`)
})

app.use("/api/users", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/tenant", tenantRoutes);


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            // console.log(`Server is connected Successfully @ ${PORT == 8000 || 5000 ? "http" : "https"}://${process.env.HOSTNAME}:${PORT}`)
            console.log(`Server is connected Successfully @ http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(`Somethings went wrong from server end: ${err.message}`)
    }
}

startServer();