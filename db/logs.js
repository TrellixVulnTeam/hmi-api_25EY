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

function getLogById(id) {
    return knex("logs").where("id", id).first();
}

async function signup(aadhar) {
    const u = await knex("users").where("aadharno",aadhar);
    if(u.length==0){
        return {"userexists":false};
    }
    else {
        return {"userexists":true};
    }
}

function makeUser(firstnanme,lastname,aadharno,mobile,email) {
    knex("users").insert({firstnanme,lastname,aadharno,mobile,email});
    return {"success":true};
}

function login(user,password) {
    const u= knex("users").where(user).first();
    if(u==NULL){
        return {"userFound":false};
    }
    else {
        if(knex("users").where(user).first().password==password){
            return {"userFound":true};
        }
        else{
            return {"password":false};
        }
    }
}


module.exports = {
    login,
    signup,
    createNewLog,
    getAllLogs,
    clearAllLogs,
    getLogById,
    makeUser,
}