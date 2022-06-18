const knex = require('./knex');

function createNewLog(log) {
    knex("logs").insert(log).then(()=> console.log("Log Added"));
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

async function signup(aadhar) {
    const u = await knex("users").where({aadharno:aadhar});
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

function makeTempUser(user, otp) {
    knex("tempusers")
        .insert({firstname:user.firstname, lastname:user.lastname, aadharno:user.aadharno, email:user.email, mobile:user.mobile, otp:otp})
        .then(()=> console.log("Temp User Added"));
}

function otpVerify(otp) {
    let f = false;
    knex("tempusers")
        .where({otp:otp})
        .first()
        .then((user)=>{
            if(user){
                console.log(user);
                knex("users")
                    .insert({firstname:user.firstname, lastname:user.lastname, aadharno:user.aadharno, email:user.email, mobile:user.mobile})
                    .then(()=> console.log("User Added"));
                knex("tempusers")
                    .where({otp:otp})
                    .del()
                    .then(()=> console.log("Temp User Deleted"));
                f = true;

            }
            else {
                console.log("OTP Invalid");
                f = false;
            }
        });
    return {"otpvalid":f};
}

async function login(user) {
    const u= await knex("users").where({aadharno:user.aadharno,firstname:user.firstname});
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
    makeUser,
    makeTempUser,
    otpVerify,
}