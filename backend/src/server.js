const express= require('express');
require('dotenv').config();
const cors=require('cors');

const app=express();
app.use(express.json())
app.use(cors())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(process.env.PORT,()=>{
    console.log("server running")
});

