# Client.watcher.stats

Get Watcher statistics. This API always returns basic metrics. You retrieve more metrics by using the metric parameter.

## Method Signature

```typescript
client.watcher.stats(this: That, params?: T.WatcherStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`WatcherStatsRequest`](../types/WatcherStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
