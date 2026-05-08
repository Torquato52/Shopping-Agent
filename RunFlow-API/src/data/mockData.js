export const productsResponse = [
  { id: 1, name: 'Teclado', price: 130, stock: 5 },
  { id: 2, name: 'Mouse', price: 90, stock: 10 },
  { id: 3, name: 'Cabo HDMI', price: 59.90, stock: 8 },
  { id: 4, name: 'Monitor HD', price: 500, stock: 3 },
  { id: 5, name: 'WebCam', price: 150, stock: 0 }
];

export const ordersResponse = [
  { id: 1, status: 'pendente', itens: [1, 2, 3], total: 279.90 },
  { id: 2, status: 'concluido', itens: [1], total: 130 },
  { id: 3, status: 'pendente', itens: [2, 3], total: 149.90 },
  { id: 4, status: 'concluido', itens: [5], total: 150 },
  { id: 5, status: 'cancelado', itens: [1, 5], total: 280 }
];
