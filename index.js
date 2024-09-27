const fs = require("node:fs");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());

async function get_file_content(filePath) {
    try {
        const file = await fs.promises.readFile(filePath, 'utf8');
        return file;
    } catch (err) {
        return "FAILED TO READ FILE";
    }
}

app.get("/", async (req, res) => {
    res.send(get_file_content(process.cwd()+"/public/main.html"));
});

const PORT = 80;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});
