import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import helmet from 'helmet';
import connectToDb from './config/db.js';
import userRoute from './routes/user.route.js';
import blogRoute from './routes/blog.route.js';
connectToDb()

const app = express();

const PORT = process.env.PORT || 3000;



app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  });
}

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRoute)
app.use('/blog',blogRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})