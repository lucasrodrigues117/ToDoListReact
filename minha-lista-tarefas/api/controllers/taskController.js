const service = require("../services/taskService");

exports.getTasks = (req, res) => {
    const tasks = service.getTasks();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
};

exports.createTask = (req, res) => {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
        if (!body) {
            res.writeHead(400);
            return res.end("Body vazio");
        }

        try {
            const data = JSON.parse(body);

            if (!data.texto) {
                res.writeHead(400);
                return res.end("Campo 'texto' é obrigatório");
            }

            const task = service.createTask(data.texto);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(task));

        } catch (error) {
            res.writeHead(400);
            res.end("JSON inválido");
        }
    });
};

exports.updateTask = (req, res, id) => {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
        const data = JSON.parse(body);
        const updated = service.updateTask(id, data);

        if (!updated) {
            res.writeHead(404);
            return res.end("Não encontrado");
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updated));
    });
};

exports.deleteTask = (req, res, id) => {
    const success = service.deleteTask(id);

    if (!success) {
        res.writeHead(404);
        return res.end("Não encontrado");
    }

    res.writeHead(204);
    res.end();
};