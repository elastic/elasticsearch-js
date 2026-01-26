# Client.indices.modifyDataStream

Update data streams. Performs one or more data stream modification actions in a single atomic operation.

## Method Signature

```typescript
client.indices.modifyDataStream(this: That, params: T.IndicesModifyDataStreamRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesModifyDataStreamResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesModifyDataStreamRequest`](../types/IndicesModifyDataStreamRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesModifyDataStreamResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
