# Client.ml.putTrainedModelAlias

Create or update a trained model alias. A trained model alias is a logical name used to reference a single trained model. You can use aliases instead of trained model identifiers to make it easier to reference your models. For example, you can use aliases in inference aggregations and processors. An alias must be unique and refer to only a single trained model. However, you can have multiple aliases for each trained model. If you use this API to update an alias such that it references a different trained model ID and the model uses a different type of data frame analytics, an error occurs. For example, this situation occurs if you have a trained model for regression analysis and a trained model for classification analysis; you cannot reassign an alias from one type of trained model to another. If you use this API to update an alias and there are very few input fields in common between the old and new trained models for the model alias, the API returns a warning.

## Method Signature

```typescript
client.ml.putTrainedModelAlias(this: That, params: T.MlPutTrainedModelAliasRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPutTrainedModelAliasResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPutTrainedModelAliasRequest`](../types/MlPutTrainedModelAliasRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPutTrainedModelAliasResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
