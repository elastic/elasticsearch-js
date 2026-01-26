# Client.watcher.deleteWatch

Delete a watch. When the watch is removed, the document representing the watch in the `.watches` index is gone and it will never be run again. Deleting a watch does not delete any watch execution records related to this watch from the watch history. IMPORTANT: Deleting a watch must be done by using only this API. Do not delete the watch directly from the `.watches` index using the Elasticsearch delete document API When Elasticsearch security features are enabled, make sure no write privileges are granted to anyone for the `.watches` index.

## Method Signature

```typescript
client.watcher.deleteWatch(this: That, params: T.WatcherDeleteWatchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherDeleteWatchResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`WatcherDeleteWatchRequest`](../types/WatcherDeleteWatchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherDeleteWatchResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
