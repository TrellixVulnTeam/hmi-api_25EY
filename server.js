const express = require('express')
const app = express();
const db = require("./db/logs");
app.use(express.json());

app.post('/api',async (req,res)=> {
    const createlog = await db.createNewLog(req.body);
    res.status(201).json({id: createlog[0],success:true});
})

app.delete('/api',async(req,res) => {
    await db.clearAllLogs();
    return res.status(200).json({success:true});
})

app.get('/api', async (req,res) => {
    const all_logs = await db.getAllLogs();
    res.status(200).json({all_logs});
});

app.get('/api/:id', async (req,res) => {
    const log = await db.getLogById(req.params.id);
    res.status(200).json({log});
});

app.post('/api/login', async (req,res) => {
    const login = await db.signup(req.body.user,req.body.password);
    if(login.userFound){
        res.status(200).json({success:true});
    } 
    if(!login.userFound) {
        res.status(200).json({success:false});
    }
    if(!login.password){
        res.status(200).json({success:false});
    }
});

app.post('/api/signup', async (req,res) => {
    const signup = await db.signup(req.body.user,req.body.password);
    if(signup.userexists){
        res.status(200).json({success:false});
    } 
    if(!signup.userexists) {
        res.status(200).json({success:true});
    }
})

app.listen(process.env.PORT || 3000,()=> {
    console.log("Server started")
});
