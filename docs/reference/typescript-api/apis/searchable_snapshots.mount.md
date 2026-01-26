# Client.searchable_snapshots.mount

Mount a snapshot. Mount a snapshot as a searchable snapshot index. Do not use this API for snapshots managed by index lifecycle management (ILM). Manually mounting ILM-managed snapshots can interfere with ILM processes.

## Method Signature

```typescript
client.searchable_snapshots.mount(this: That, params: T.SearchableSnapshotsMountRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchableSnapshotsMountResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SearchableSnapshotsMountRequest`](../types/SearchableSnapshotsMountRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SearchableSnapshotsMountResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
