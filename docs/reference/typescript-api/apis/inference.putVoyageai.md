# Client.inference.putVoyageai

Create a VoyageAI inference endpoint. Create an inference endpoint to perform an inference task with the `voyageai` service. Avoid creating multiple endpoints for the same model unless required, as each endpoint consumes significant resources.

## Method Signature

```typescript
client.inference.putVoyageai(this: That, params: T.InferencePutVoyageaiRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutVoyageaiResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutVoyageaiRequest`](../types/InferencePutVoyageaiRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutVoyageaiResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
