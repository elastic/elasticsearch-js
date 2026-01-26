# Client.inference.put

Create an inference endpoint. IMPORTANT: The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Mistral, Azure OpenAI, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs. The following integrations are available through the inference API. You can find the available task types next to the integration name: * AI21 (`chat_completion`, `completion`) * AlibabaCloud AI Search (`completion`, `rerank`, `sparse_embedding`, `text_embedding`) * Amazon Bedrock (`completion`, `text_embedding`) * Amazon SageMaker (`chat_completion`, `completion`, `rerank`, `sparse_embedding`, `text_embedding`) * Anthropic (`completion`) * Azure AI Studio (`completion`, `rerank`, `text_embedding`) * Azure OpenAI (`chat_completion`, `completion`, `text_embedding`) * Cohere (`completion`, `rerank`, `text_embedding`) * DeepSeek (`chat_completion`, `completion`) * Elasticsearch (`rerank`, `sparse_embedding`, `text_embedding` - this service is for built-in models and models uploaded through Eland) * ELSER (`sparse_embedding`) * Google AI Studio (`completion`, `text_embedding`) * Google Vertex AI (`chat_completion`, `completion`, `rerank`, `text_embedding`) * Groq (`chat_completion`) * Hugging Face (`chat_completion`, `completion`, `rerank`, `text_embedding`) * JinaAI (`rerank`, `text_embedding`) * Llama (`chat_completion`, `completion`, `text_embedding`) * Mistral (`chat_completion`, `completion`, `text_embedding`) * Nvidia (`chat_completion`, `completion`, `text_embedding`, `rerank`) * OpenAI (`chat_completion`, `completion`, `text_embedding`) * OpenShift AI (`chat_completion`, `completion`, `rerank`, `text_embedding`) * VoyageAI (`rerank`, `text_embedding`) * Watsonx (`chat_completion`, `completion`, `rerank`, `text_embedding`)

## Method Signature

```typescript
client.inference.put(this: That, params: T.InferencePutRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutRequest`](../types/InferencePutRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
