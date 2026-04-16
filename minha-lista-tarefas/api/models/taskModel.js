let tasks = [];

const getAll = () => tasks;

const create = (task) => {
    tasks.push(task);
    return task;
};

const update = (id, updatedData) => {
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...updatedData };
    return tasks[index];
};

const remove = (id) => {
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
};

module.exports = { getAll, create, update, remove };