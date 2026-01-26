# Client.inference.inference

Perform inference on the service. This API enables you to use machine learning models to perform specific tasks on data that you provide as an input. It returns a response with the results of the tasks. The inference endpoint you use can perform one specific task that has been defined when the endpoint was created with the create inference API. For details about using this API with a service, such as Amazon Bedrock, Anthropic, or HuggingFace, refer to the service-specific documentation. > info > The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Azure, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs.

## Method Signature

```typescript
client.inference.inference(this: That, params: T.InferenceInferenceRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferenceInferenceResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferenceInferenceRequest`](../types/InferenceInferenceRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferenceInferenceResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
