# Client.dangling_indices.listDanglingIndices

Get the dangling indices. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline. Use this API to list dangling indices, which you can then import or delete.

## Method Signature

```typescript
client.dangling_indices.listDanglingIndices(this: That, params?: T.DanglingIndicesListDanglingIndicesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DanglingIndicesListDanglingIndicesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`DanglingIndicesListDanglingIndicesRequest`](../types/DanglingIndicesListDanglingIndicesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.DanglingIndicesListDanglingIndicesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
