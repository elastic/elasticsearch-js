# Client.cat.mlTrainedModels

Get trained models. Get configuration and usage information about inference trained models. IMPORTANT: CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get trained models statistics API.

## Method Signature

```typescript
client.cat.mlTrainedModels(this: That, params?: T.CatMlTrainedModelsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatMlTrainedModelsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatMlTrainedModelsRequest`](../types/CatMlTrainedModelsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatMlTrainedModelsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
