import * as productService from '../service/productService.js';

export const listProducts = (req, res) => {
  const formattedProducts = productService.formatAllProducts();
  const availableProducts = formattedProducts.filter(p => p.stock > 0);

  if (availableProducts.length === 0) {
    return res.status(200).json({
      success: false,
      message: 'Nenhum produto disponível em estoque no momento',
      products: []
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Produtos listados com sucesso',
    totalProducts: formattedProducts.length,
    availableProducts: availableProducts.length,
    products: formattedProducts
  });
};

export const getProduct = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID do produto inválido' });
  }

  const product = productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Produto não encontrado' });
  }

  const hasStock = product.stock > 0;

  return res.status(200).json({
    success: true,
    message: hasStock ? 'Produto encontrado e disponível' : 'Produto encontrado, porém sem estoque',
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      availability: hasStock ? 'in_stock' : 'out_of_stock'
    }
  });
};