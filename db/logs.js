const knex = require('./knex');

function createNewLog(log) {
    return knex("logs").insert(log);
};

function getAllLogs() {
    return knex("logs").select("*");
}

function clearAllLogs() {
    return knex("logs").select("*").del();
}
module.exports = {
    createNewLog,
    getAllLogs,
    clearAllLogs,
}