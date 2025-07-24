import express from 'express';  // Import types
import prisma from './prisma/client.js';
import auth from './routers/auth.js';
import userTask from './routers/user.js';
import authMiddleHandler from './middlewares/authMiddleware.js';
import cors from 'cors';




const app = express();
app.use(express.json());


// app.get('/signup',async (req,res) =>{ 
//   const userlist = await prisma.user.findMany();
//   res.status(200).json({userlist})
// });


app.use(cors());
app.use('/',auth);
app.use('/',authMiddleHandler,userTask);


app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
