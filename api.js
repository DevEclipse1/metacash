const fs = require("node:fs")

const express = require("express");
const app = express();
app.use(express.json());

async function get_file_content(path, filename)
{
    const filePath = path.join(path, filename);

    try {
        const file = await fs.promises.readFile(filePath, 'utf8');
        return file;
    } catch (err) {
        return "FAILED TO READ FILE " + filename;
    }
}

app.get("/", async (req, res) => {
    res.type("html").send(get_file_content(process.cwd()+"/public/", "main.html"));
});

const PORT = 80;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});