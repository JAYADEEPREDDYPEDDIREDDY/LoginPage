const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect('mongodb+srv://username:GMX9u0n3uEGlgwaj@cluster0.nxjqpjn.mongodb.net/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected successfully");
}).catch((err) => {
  console.error(err);
});

const app = express();
app.use(express.json());
app.use(cors());
app.listen("3000", () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  console.log("Hello world");
  res.json("Success");
});

app.post('/signUp',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
      
      
       const existingUser = await mongoose.connection.db.collection('users').findOne({ email });
       if(existingUser){
        res.json("already registered")
       }
       else{
        const newUser = { name, email, password };
        const users = await mongoose.connection.db.collection("users");
        users.insertOne(newUser);
        res.status(201).json({ message: 'User registered successfully' });
       }
    }
    catch{


    }
})
app.post("/login", async (req, res) => {
    const {email,password}= req.body;
    console.log(email,password)
    try {
      const users = await mongoose.connection.db.collection('users');
      const user = await users.findOne({"email": email});
      if( user){
      if(user.password=== password){
        res.json('login success');
      }
      else{
        res.json("login failed")
      }
    }
    else{
        res.json("user not found")
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  