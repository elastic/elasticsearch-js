# Client.inference.completion

Perform completion inference on the service. Get responses for completion tasks. This API works only with the completion task type. IMPORTANT: The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Azure, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs. This API requires the `monitor_inference` cluster privilege (the built-in `inference_admin` and `inference_user` roles grant this privilege).

## Method Signature

```typescript
client.inference.completion(this: That, params: T.InferenceCompletionRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferenceCompletionResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferenceCompletionRequest`](../types/InferenceCompletionRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferenceCompletionResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
