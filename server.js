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

app.listen(3000,()=> {
    console.log("Server started")
});