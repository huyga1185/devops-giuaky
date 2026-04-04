import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import sinhVienRoute from './routes/sinhVienRoute.js';
import authRoute from './routes/authRoute.js';
import { createAdmin } from './services/taiKhoanService.js';
>>>>>>> develop

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/sv', sinhVienRoute);
app.use('/api/auth', authRoute);

await createAdmin();

const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Server not started: ${err}`);
    process.exit(1); 
  }
};

app.get('/api/health', (req, res) => {
  res.status(200).json({status:"ok"});
});

startServer();
