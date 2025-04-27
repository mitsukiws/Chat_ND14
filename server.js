require("dotenv").config();
let db = require("./db");
let http = require("http");
let path = require("path");
let fs = require("fs");
let socket = require("socket.io");

let pathToIndex = path.join(__dirname, "static", "index.html");
let index = fs.readFileSync(pathToIndex, "utf-8");

let pathToStyle = path.join(__dirname, "static", "style.css");
let style = fs.readFileSync(pathToStyle, "utf-8");

let pathToScript = path.join(__dirname, "static", "script.js");
let script = fs.readFileSync(pathToScript, "utf-8");

let server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/":
            res.writeHead(200, { "content-type": "text/html" });
            res.end(index);
            break;
        case "/style.css":
            res.writeHead(200, { "content-type": "text/css" });
            res.end(style);
            break;
        case "/script.js":
            res.writeHead(200, { "content-type": "text/js" });
            res.end(script);
            break;
        default:
            res.writeHead(404, { "content-type": "text/html" });
            res.end("<h1>GO AWAY!</h1>");
    }
}).listen(3000, () => console.log("server is on!"));

let io = new socket.Server(server);

let chat = []

io.on("connection", (s)=>{
    console.log("User id: " + s.id)
    io.emit("update", JSON.stringify(chat))
    s.on("message", (data)=>{
        let message = JSON.parse(data)
        chat.push(message)
        io.emit("update", JSON.stringify(chat))
    })
})


db.getUsers()
.then((result)=> {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});

