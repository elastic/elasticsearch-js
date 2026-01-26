# Client.cat.snapshots

Get snapshot information. Get information about the snapshots stored in one or more repositories. A snapshot is a backup of an index or running Elasticsearch cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get snapshot API.

## Method Signature

```typescript
client.cat.snapshots(this: That, params?: T.CatSnapshotsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatSnapshotsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatSnapshotsRequest`](../types/CatSnapshotsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatSnapshotsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
