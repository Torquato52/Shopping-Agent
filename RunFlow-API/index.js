import express from 'express';
import productRoutes from './src/routers/productRoutes.js';
import orderRoutes from './src/routers/orderRoute.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando corretamente'
  });
});

app.use('/products', productRoutes); 
app.use('/orders', orderRoutes); 

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});