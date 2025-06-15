require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const productApiRoutes = require('./routes/productApiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/uploads', express.static('uploads'));

app.use('/api', productApiRoutes);
app.use('/', productRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});


