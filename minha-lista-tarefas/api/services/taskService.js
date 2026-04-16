const model = require("../models/taskModel");

const getTasks = () => model.getAll();

const createTask = (texto) => {
    const newTask = {
        id: Date.now(),
        texto,
        concluida: false
    };
    return model.create(newTask);
};

const updateTask = (id, data) => {
    return model.update(id, data);
};

const deleteTask = (id) => {
    return model.remove(id);
};

module.exports = { getTasks, createTask, updateTask, deleteTask };