const { exec } = require("child_process");
const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const PORT = 8080;
exec(`lsof -i tcp:${PORT} | awk '{if(NR>1)print }'`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    if (`${stdout} === ''`) {
    } else {
        exec(`kill -9 ${stdout}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`the port ${PORT} is not in use now`);
            return;
        });
    }
});
app.use(express.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.static("./public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.get("", (req, res) => res.render("index", { text: "This is EJS" }));
app.use(cors());
app.use(router);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
