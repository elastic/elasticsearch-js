# Client.indices.addBlock

Add an index block. Add an index block to an index. Index blocks limit the operations allowed on an index by blocking specific operation types.

## Method Signature

```typescript
client.indices.addBlock(this: That, params: T.IndicesAddBlockRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesAddBlockResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesAddBlockRequest`](../types/IndicesAddBlockRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesAddBlockResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
