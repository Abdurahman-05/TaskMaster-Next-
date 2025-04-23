import express from 'express';  // Import types
import prisma from './prisma/client.js';
import { registerController } from './controllers/register.js';

import auth from './routers/auth.js';
import { PiUserListLight } from 'react-icons/pi';




const app = express();


app.use(express.json());


app.get('/signup',async (req,res) =>{ 
  const userlist = await prisma.user.findMany();
  res.status(200).json({userlist})
});
app.use('/',auth);

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
