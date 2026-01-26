# Client.inference.putAzureopenai

Create an Azure OpenAI inference endpoint. Create an inference endpoint to perform an inference task with the `azureopenai` service. The list of chat completion models that you can choose from in your Azure OpenAI deployment include: * [GPT-4 and GPT-4 Turbo models](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions#gpt-4-and-gpt-4-turbo-models) * [GPT-3.5](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions#gpt-35) The list of embeddings models that you can choose from in your deployment can be found in the [Azure models documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions#embeddings).

## Method Signature

```typescript
client.inference.putAzureopenai(this: That, params: T.InferencePutAzureopenaiRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutAzureopenaiResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutAzureopenaiRequest`](../types/InferencePutAzureopenaiRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutAzureopenaiResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
