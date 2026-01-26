# Client.dangling_indices.deleteDanglingIndex

Delete a dangling index. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline.

## Method Signature

```typescript
client.dangling_indices.deleteDanglingIndex(this: That, params: T.DanglingIndicesDeleteDanglingIndexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DanglingIndicesDeleteDanglingIndexResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`DanglingIndicesDeleteDanglingIndexRequest`](../types/DanglingIndicesDeleteDanglingIndexRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.DanglingIndicesDeleteDanglingIndexResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
