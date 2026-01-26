# Client.indices.removeBlock

Remove an index block. Remove an index block from an index. Index blocks limit the operations allowed on an index by blocking specific operation types.

## Method Signature

```typescript
client.indices.removeBlock(this: That, params: T.IndicesRemoveBlockRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesRemoveBlockResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesRemoveBlockRequest`](../types/IndicesRemoveBlockRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesRemoveBlockResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
