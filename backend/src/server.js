const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express= require('express');
require('dotenv').config();
const cors=require('cors');
const connectToDb = require('./config/db');

const app=express();
app.use(express.json())
app.use(cors())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

connectToDb().then(()=>{
   app.listen(process.env.PORT,()=>{
    console.log("server running")
  })
});

