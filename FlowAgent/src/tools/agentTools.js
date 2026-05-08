import { tool } from "@langchain/core/tools";
import { z } from "zod";
import * as apiTools from "../api/comprasApi.js";

const ProductIdSchema = z.object({
    id: z.number().describe("O ID numérico do produto")
});

const OrderIdSchema = z.object({
    id: z.number().describe("O ID numérico do pedido")
});

const CreateOrderSchema = z.object({
    itens: z.array(z.number()).describe("Array com os IDs dos produtos que o cliente deseja comprar. Ex: [1, 4]")
});

const verificarEstoque = tool(
    async () => {
        const result = await apiTools.ListProducts();
        if (!result.success) return `Erro ao consultar catálogo.`;
        
        return result.products.map(p => {
            return `Produto: ${p.name} | ID: ${p.id} | Preço: R$ ${p.price} | Estoque: ${p.stock}`;
        }).join('\n');
    },
    {
        name: "verificar_estoque_e_precos",
        description: "Lista todos os produtos disponíveis da loja. Chame esta função SEMPRE que o usuário perguntar sobre produtos ou antes de vender algo.",
    }
);

const detalharProduto = tool(
    async ({ id }) => {
        const result = await apiTools.getProduct(id);
        if (!result.success) return `Produto com ID ${id} não encontrado.`;
        
        const p = result.product;
        return `Produto: ${p.name} | ID: ${p.id} | Preço: R$ ${p.price} | Estoque: ${p.stock}`;
    },
    {
        name: "detalhar_produto_por_id",
        description: "Busca detalhes de um produto específico pelo seu ID.",
        schema: ProductIdSchema
    }
);

const consultarPedido = tool(
    async ({ id }) => {
        const result = await apiTools.getOrder(id);
        if (!result.success) return `Pedido ${id} não encontrado.`;
        
        const order = result.order;
        return `ID DO PEDIDO: ${order.id} | STATUS: ${order.status} | ITENS: ${order.itens.join(', ')} | VALOR TOTAL: R$ ${order.total}`;
    },
    {
        name: "consultar_status_pedido",
        description: "Consulta o status de um pedido existente.",
        schema: OrderIdSchema
    }
);

const finalizarCompra = tool(
    async ({ itens }) => {
        const result = await apiTools.createOrder({ itens });
        if (!result.success) return `ERRO AO CRIAR PEDIDO: ${result.data?.message || result.message}`;
        
        return `PEDIDO CRIADO COM SUCESSO! ID: ${result.order.id} | STATUS: ${result.order.status} | TOTAL: R$ ${result.order.total}`;
    },
    {
        name: "finalizar_compra_cliente",
        description: "Cria um novo pedido. SÓ USE ISSO se o cliente já confirmou os itens que quer comprar.",
        schema: CreateOrderSchema
    }
);

export const toolsList = [verificarEstoque, detalharProduto, consultarPedido, finalizarCompra];