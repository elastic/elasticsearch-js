# Client.indices.createDataStream

Create a data stream. You must have a matching index template with data stream enabled.

## Method Signature

```typescript
client.indices.createDataStream(this: That, params: T.IndicesCreateDataStreamRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesCreateDataStreamResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesCreateDataStreamRequest`](../types/IndicesCreateDataStreamRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesCreateDataStreamResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
