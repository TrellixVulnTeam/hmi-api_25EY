const express = require("express");
const app = express();
const db = require("./db/logs");
const accountSid = "AC1384ca7011bad95b538cbe36c491214b";
const authToken = "305b45643dea6a2395d6ccec282767aa";
const client = require("twilio")(accountSid, authToken);

app.use(express.json());

app.post("/api", async (req, res) => {
  const createlog = await db.createNewLog(req.body);
  res.status(201).json( req.body );
});

app.delete("/api", async (req, res) => {
  await db.clearAllLogs();
  return res.status(200).json( req.body );
});

app.get("/api", async (req, res) => {
  const all_logs = await db.getAllLogs();
  res.status(200).json({ all_logs });
});

app.get("/users", async (req, res) => {
  const all_users = await db.getALLUsers();
  res.status(200).json({ all_users });
});

// app.get("/api/:id", async (req, res) => {
//   const log = await db.getLogById(req.params.id);
//   res.status(200).json({ log });
// });

app.post("/api/login", async (req, res) => {
  const login = await db.login(req.body);
  console.log(login);
  if (login.userfound==true) {
    res.status(200).json({ success: true });
  }
  else {
    res.status(200).json({ success: false });
  }
});

app.post("/api/signup", async (req, res) => {
  const signup = await db.signup(req.body.aadharno);
  console.log(signup);
  if (signup.userexists == false) {
    const newUser = db.makeUser(req.body);
    res.status(200).json(req.body);
    // client.verify
    //   .services("VA9e7ba931eeb8f5be7d4148d3fd48d8c7")
    //   .verifications.create({ to: `+91${req.body.phone}`, channel: "sms" })
    //   .then((verification) => res.status(200).json(verification));
  }
  else {
    res.status(200).json({ message:"User Already Exists!" });
  }
});

app.post("/api/otp", async (req, res) => {
  client.verify
    .services("VA9e7ba931eeb8f5be7d4148d3fd48d8c7")
    .verificationChecks.create({ to: `+91${req.body.phone}`, code: `${req.body.otp}` })
    .then((verification_check) => res.status(200).json(verification_check));
    if(verification_check.success==="approved"){
        await db.makeUser(req.body.firstname,req.body.lastname,req.body.aadharno,req.body.mobile,req.body.email);
    }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
