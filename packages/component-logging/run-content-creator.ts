import { ContentCreator } from './content-maker/content-formater';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { LangfuseExporter } from 'langfuse-vercel';

// Initialize the OpenTelemetry SDK
const sdk = new NodeSDK({
    traceExporter: new LangfuseExporter(),
    instrumentations: [getNodeAutoInstrumentations()],
});

async function main() {
    try {
        // Start the SDK
        sdk.start();

        // Example usage of ContentCreator
        const modelName = 'google:gemini-1.5-flash-latest' // 'ollama'; //'google:gemini-1.5-flash-latest'; // or any other model you want to use
        const userPrompt = 'Create a LinkedIn post about where AI is going in 2025, provide research and links';

        const response = await ContentCreator(modelName, userPrompt);
        console.log('Response:', response);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ensure proper shutdown
        await sdk.shutdown();
    }
}

// Run the main function
main().catch(console.error); 