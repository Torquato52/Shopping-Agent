import { ChatOllama } from "@langchain/ollama";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { agentPrompt } from "../prompts/agentPrompt.js";
import { toolsList } from "../tools/agentTools.js";

export async function setupAgent() {
    const llm = new ChatOllama({
        baseUrl: "{URL_DO_SEU_SERVIDOR_OLLAMA}",
        model: "{MODELO_TREINADO_NO_OLLAMA}",
        temperature: 0.6
    });

    const agent = await createToolCallingAgent({
        llm,
        tools: toolsList,
        prompt: agentPrompt
    });

    return new AgentExecutor({
        agent,
        tools: toolsList,
        verbose: true,
        maxIterations: 10
    });
}