# Client.dangling_indices.importDanglingIndex

Import a dangling index. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline.

## Method Signature

```typescript
client.dangling_indices.importDanglingIndex(this: That, params: T.DanglingIndicesImportDanglingIndexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DanglingIndicesImportDanglingIndexResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`DanglingIndicesImportDanglingIndexRequest`](../types/DanglingIndicesImportDanglingIndexRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.DanglingIndicesImportDanglingIndexResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
