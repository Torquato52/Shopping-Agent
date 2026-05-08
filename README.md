# Agente Autônomo com IA Local e Tool Calling

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://js.langchain.com/)
[![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.com/)

> Um agente de inteligência artificial autônomo para e-commerce, capaz de consultar estoques e realizar vendas em tempo real.

## 🚀 Como Executar

Para rodar o projeto, o primeiro passo é instalar as dependências necessárias. Execute o comando abaixo no terminal:

```bash
npm install @langchain/core @langchain/ollama axios cors express langchain zod
```

Após a instalação, é necessário configurar a conexão com o Ollama/IA alterando a URL base da IA no arquivo:

`FlowAgent/src/agents/comprasAgent.js`

A execução do sistema deve seguir a seguinte ordem:

1. Iniciar a RunFlow-API
2. Iniciar o FlowAgent
3. Abrir o arquivo `index.html` (Front-end)

---

## 🏗️ Estrutura do Projeto
O projeto foi dividido em três partes principais:

### 1. RunFlow-API
A RunFlow-API é responsável por disponibilizar os endpoints utilizados pelo agente. Ela fornece todas as informações relacionadas ao catálogo de produtos e aos pedidos realizados.
Para simplificar os testes e demonstrações, os dados não estão sendo persistidos em um banco de dados real. Todo o catálogo foi mockado diretamente em arrays dentro da aplicação, permitindo focar exclusivamente no comportamento do agente e no fluxo de comunicação entre os serviços.


<img width="920" height="388" alt="image" src="https://github.com/user-attachments/assets/e1f6c661-5f25-4f95-9352-0372c5929e46" />

### 2. FlowAgent
O FlowAgent funciona como o núcleo do projeto, sendo responsável por toda a lógica de comportamento da IA.
Dentro dele estão definidos:

* O prompt de sistema
* As regras de comportamento
* As Tools utilizadas pelo agente
* O fluxo de execução das ações

Cada endpoint da API possui uma Tool específica responsável pela comunicação com a RunFlow-API.
Para evitar chamadas inválidas e problemas de tipagem, foi utilizado o **Zod**, biblioteca responsável pela validação dos schemas. Dessa forma, a IA só consegue executar ações caso os dados estejam no formato esperado, reduzindo erros de estrutura e inconsistências nas requisições.


<img width="912" height="221" alt="image" src="https://github.com/user-attachments/assets/235a63b7-7667-4da4-ba16-398a27cb32aa" />


Para a execução da IA, a escolha foi utilizar o **Ollama**, principalmente pela possibilidade de rodar modelos localmente sem custos de API e sem limitação de requisições. Toda a execução acontece localmente através de contêiner Docker.
O modelo escolhido como motor principal foi o **Granite 4.1 (IBM)**, por apresentar o melhor desempenho no cenário de agentes autônomos com Tool Calling. Durante os testes, ele demonstrou maior capacidade de:

* Seguir regras rígidas de comportamento
* Evitar desvios de contexto
* Gerar respostas estruturadas em JSON
* Interpretar corretamente chamadas de ferramentas
* Trabalhar bem com fluxos orientados a ações

Antes da definição final, também foram realizados testes comparativos com os modelos: **llama3.1**, **hermes3**, **qwen3**. Entre eles, o Granite foi o modelo que apresentou os resultados mais consistentes durante as execuções.

### 3. Front-end (Interface do Cliente)
Para a interface visual, foi desenvolvido um front-end simples utilizando apenas HTML, CSS e JavaScript.
O principal objetivo da interface foi servir como uma camada leve de comunicação com o agente, permitindo testar os fluxos de conversa e execução das ferramentas.
Um dos diferenciais do front-end é a utilização do **marked.js**, biblioteca responsável por interpretar Markdown e converter as respostas retornadas pela IA em elementos visuais mais organizados.

---

## 🧠 Fluxo de Trabalho do Agente
O fluxo do agente foi estruturado para funcionar de maneira totalmente orientada ao contexto da conversa.
Ao receber uma solicitação do usuário, o agente interpreta a intenção da mensagem e decide quais ferramentas devem ser utilizadas para concluir a ação.
O comportamento segue o seguinte fluxo:

1. **Consulta de Contexto**
O agente consulta as Tools responsáveis pelo catálogo para identificar quais produtos estão disponíveis e obter as informações necessárias antes de responder.

2. **Validação**
Sempre que existe uma tentativa de compra, o agente valida automaticamente se o item possui estoque disponível antes de prosseguir com qualquer ação.

3. **Execução**
Após a confirmação do pedido e validação dos dados, o agente realiza a requisição POST para criação do pedido, respeitando todas as regras de tipagem definidas pelo Zod.
Abaixo está o log de execução do Docker, mostrando as requisições para modelo e o tempo de resposta durante as chamadas:


<img width="681" height="189" alt="image" src="https://github.com/user-attachments/assets/6b8e0113-f4d5-4491-8b09-157534db9895" />


---

## 📊 Resultados e Demonstração dos Fluxos
Abaixo estão alguns exemplos práticos demonstrando o comportamento do agente durante diferentes cenários de uso.

**Fluxo 1: Listagem de Produtos**
<img width="631" height="559" alt="image" src="https://github.com/user-attachments/assets/9e2aaa05-96e9-4ca7-aea6-11a73d816553" />

**Fluxo 2: Consulta de Detalhes do Produto**
<img width="631" height="559" alt="image" src="https://github.com/user-attachments/assets/d97f282b-be7c-4a42-ac03-602cde8ad037" />
<img width="652" height="560" alt="image" src="https://github.com/user-attachments/assets/08a8ea01-099d-4ffb-8bd6-55534d8c3267" />

**Fluxo 3: Criação de Pedido**
<img width="641" height="554" alt="image" src="https://github.com/user-attachments/assets/40ed7ef4-8998-4a12-8535-89913ddc44c3" />

**Fluxo 4: Consulta de Pedido**
<img width="634" height="567" alt="image" src="https://github.com/user-attachments/assets/b7df6353-1a0b-4d3f-bb86-d11dfe8e4648" />

**Fluxo 5: Tratamento de Erros**
<img width="634" height="556" alt="image" src="https://github.com/user-attachments/assets/d2c1e6eb-55a4-47fd-ae49-bd2b81d531bf" />
<img width="619" height="396" alt="image" src="https://github.com/user-attachments/assets/23ee1dfb-5c1e-44cc-90e5-f2e4de17cc60" />
<img width="601" height="296" alt="image" src="https://github.com/user-attachments/assets/36494811-482f-4bab-bc2b81d531bf" />

**Fluxo 6: Limites do Agente**
<img width="649" height="552" alt="image" src="https://github.com/user-attachments/assets/cc0af53c-6737-43ca-ad2c-f9d1383f98c9" />
<img width="634" height="571" alt="image" src="https://github.com/user-attachments/assets/b6dbccf6-94a2-4980-836d-85f5a89bcb53" />
