# Client.ml.putTrainedModelVocabulary

Create a trained model vocabulary. This API is supported only for natural language processing (NLP) models. The vocabulary is stored in the index as described in `inference_config.*.vocabulary` of the trained model definition.

## Method Signature

```typescript
client.ml.putTrainedModelVocabulary(this: That, params: T.MlPutTrainedModelVocabularyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPutTrainedModelVocabularyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPutTrainedModelVocabularyRequest`](../types/MlPutTrainedModelVocabularyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPutTrainedModelVocabularyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
