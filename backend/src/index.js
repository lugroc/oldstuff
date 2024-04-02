const express = require('express');
const env = require('dotenv');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

//env variables
env.config();


//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')


//mongodb
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.rfots.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("💻 Connected"))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});
