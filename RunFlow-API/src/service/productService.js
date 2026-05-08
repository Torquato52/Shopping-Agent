import { productsResponse as products } from '../data/mockData.js';

export const formatAllProducts = () => {
  return products.map(product => {
    const hasStock = product.stock > 0;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      availability: hasStock ? 'in_stock' : 'out_of_stock',
      message: hasStock
        ? `Produto ${product.name} disponível em estoque`
        : `Produto ${product.name} indisponível no momento`
    };
  });
};

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};