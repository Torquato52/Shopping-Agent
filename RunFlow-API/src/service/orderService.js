import { productsResponse as products, ordersResponse as orders } from '../data/mockData.js';

export const createOrderService = (itens) => {
  const productsToOrder = itens.map(id => products.find(p => p.id === id));
  
  if (productsToOrder.some(p => !p)) throw new Error('Produto não encontrado');
  if (productsToOrder.some(p => p.stock <= 0)) throw new Error('Produto fora de estoque');

  const total = productsToOrder.reduce((sum, p) => sum + p.price, 0);

  productsToOrder.forEach(p => p.stock -= 1);

  const newOrder = {
    id: orders.length + 1,
    status: 'pendente',
    itens,
    total: Number(total.toFixed(2))
  };
  orders.push(newOrder);

  return newOrder;
};