const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routers/index");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter) 





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});