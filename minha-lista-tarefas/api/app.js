const http = require("http");
const routes = require("./routes");

const server = http.createServer((req, res) => {
    // CORS (IMPORTANTE pro React funcionar)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    routes(req, res);
});

server.listen(3000, () => {
    console.log("API rodando em http://localhost:3000");
});