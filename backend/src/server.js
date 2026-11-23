const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express= require('express');
require('dotenv').config();
const cors=require('cors');
const cookieParser= require('cookie-parser');
const connectToDb = require('./config/db');
const authRoutes=require('./routes/auth.routes.js');
const problemRoutes = require('./routes/problem.routes.js');
const errorMiddleware= require('./middleware/error.middleware.js');
const app=express();

app.use(express.json())
app.use(cookieParser());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use(errorMiddleware);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

connectToDb().then(()=>{
   app.listen(process.env.PORT,()=>{
    console.log("server running")
  })
});

