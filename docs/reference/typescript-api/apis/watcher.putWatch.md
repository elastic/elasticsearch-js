# Client.watcher.putWatch

Create or update a watch. When a watch is registered, a new document that represents the watch is added to the `.watches` index and its trigger is immediately registered with the relevant trigger engine. Typically for the `schedule` trigger, the scheduler is the trigger engine. IMPORTANT: You must use Kibana or this API to create a watch. Do not add a watch directly to the `.watches` index by using the Elasticsearch index API. If Elasticsearch security features are enabled, do not give users write privileges on the `.watches` index. When you add a watch you can also define its initial active state by setting the *active* parameter. When Elasticsearch security features are enabled, your watch can index or search only on indices for which the user that stored the watch has privileges. If the user is able to read index `a`, but not index `b`, the same will apply when the watch runs.

## Method Signature

```typescript
client.watcher.putWatch(this: That, params: T.WatcherPutWatchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherPutWatchResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`WatcherPutWatchRequest`](../types/WatcherPutWatchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherPutWatchResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
