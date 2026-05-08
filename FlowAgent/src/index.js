import express from 'express';
import cors from 'cors';
import { setupAgent } from './agents/comprasAgent.js';
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const app = express();
app.use(express.json());
app.use(cors()); 

const chatMemory = {}; 

let executor;

setupAgent().then(agent => {
    executor = agent;
    console.log("Agente inicializado e pronto!");
});

app.post('/api/chat', async (req, res) => {
    const { message, sessionId = "default_session" } = req.body;

    if (!executor) {
        return res.status(500).json({ error: "Agente ainda não inicializado." });
    }

    if (!chatMemory[sessionId]) {
        chatMemory[sessionId] = [];
    }

    try {
        const response = await executor.invoke({ 
            input: message,
            chat_history: chatMemory[sessionId] 
        });

        chatMemory[sessionId].push(new HumanMessage(message));
        chatMemory[sessionId].push(new AIMessage(response.output));

        res.json({ reply: response.output });
    } catch (error) {
        console.error("Erro no agente:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
});

app.listen(3001, () => {
    console.log("API rodando na porta 3001");
});