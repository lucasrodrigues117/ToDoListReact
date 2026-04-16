const controller = require("../controllers/taskController");

module.exports = (req, res) => {
    const url = req.url.split("/");
    const id = url[2];

    if (req.url === "/tasks" && req.method === "GET") {
        return controller.getTasks(req, res);
    }

    if (req.url === "/tasks" && req.method === "POST") {
        return controller.createTask(req, res);
    }

    if (url[1] === "tasks" && req.method === "PUT") {
        return controller.updateTask(req, res, id);
    }

    if (url[1] === "tasks" && req.method === "DELETE") {
        return controller.deleteTask(req, res, id);
    }

    res.writeHead(404);
    res.end("Rota não encontrada");
};