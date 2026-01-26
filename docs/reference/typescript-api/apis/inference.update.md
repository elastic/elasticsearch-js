# Client.inference.update

Update an inference endpoint. Modify `task_settings`, secrets (within `service_settings`), or `num_allocations` for an inference endpoint, depending on the specific endpoint service and `task_type`. IMPORTANT: The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Azure, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs.

## Method Signature

```typescript
client.inference.update(this: That, params: T.InferenceUpdateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferenceUpdateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferenceUpdateRequest`](../types/InferenceUpdateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferenceUpdateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
