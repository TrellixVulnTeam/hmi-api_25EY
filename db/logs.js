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

function getALLUsers() {
    return knex("users").select("*");
}

// function getLogById(id) {
//     return knex("logs").where("id", id).first();
// }

async function signup(aadhar) {
    const u = await knex("users").where("aadharno",aadhar);
    if(u.length==0){
        return {"userexists":false};
    }
    else {
        return {"userexists":true};
    }
}

function makeUser(user) {
    console.log(user);
    knex("users").insert(user).then(()=> console.log("User Added"));
}

async function login(user) {
    const u= await knex("users").where({"aadharno":user.aadharno,"firstname":user.firstname});
    if(u.length==0){
        return {"userfound":false};
    }
    else {
        return {"userfound":true};
    }
}


module.exports = {
    login,
    signup,
    createNewLog,
    getAllLogs,
    clearAllLogs,
    getALLUsers,
    // getLogById,
    makeUser,
}