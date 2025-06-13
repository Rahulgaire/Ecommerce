const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//routes
const authRouter= require('./routes/auth.Routes.js')
const contactRoute=require('./routes/contact.routes.js')
const productRouter =require('./routes/Product.routes.js')
dotenv.config();

//middleware used
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());

//routes middleware
app.use('/auth',authRouter)
app.use('/contact',contactRoute)
app.use('/api/products',productRouter)


app.get('/', (req, res) => {
  res.send('<h1>API is working!</h1>');
});

const PORT = process.env.PORT || 5000;
connectDB()
.then(()=>{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err)=>{
  console.log(`Server connection failed ${err}`)
})