import * as orderService from '../service/orderService.js';
import { ordersResponse as orders } from '../data/mockData.js';

export const createOrder = (req, res) => {
  try {
    const { itens } = req.body;

    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ success: false, message: 'Itens do pedido inválidos' });
    }

    const newOrder = orderService.createOrderService(itens);

    return res.status(201).json({ success: true, message: 'Pedido criado com sucesso', order: newOrder });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID do pedido inválido' });
  }

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
  }

  return res.status(200).json({ success: true, message: 'Pedido encontrado com sucesso', order });
};