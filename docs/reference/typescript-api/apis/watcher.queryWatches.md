# Client.watcher.queryWatches

Query watches. Get all registered watches in a paginated manner and optionally filter watches by a query. Note that only the `_id` and `metadata.*` fields are queryable or sortable.

## Method Signature

```typescript
client.watcher.queryWatches(this: That, params?: T.WatcherQueryWatchesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherQueryWatchesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`WatcherQueryWatchesRequest`](../types/WatcherQueryWatchesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherQueryWatchesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
