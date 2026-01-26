# Client.watcher.updateSettings

Update Watcher index settings. Update settings for the Watcher internal index (`.watches`). Only a subset of settings can be modified. This includes `index.auto_expand_replicas`, `index.number_of_replicas`, `index.routing.allocation.exclude.*`, `index.routing.allocation.include.*` and `index.routing.allocation.require.*`. Modification of `index.routing.allocation.include._tier_preference` is an exception and is not allowed as the Watcher shards must always be in the `data_content` tier.

## Method Signature

```typescript
client.watcher.updateSettings(this: That, params?: T.WatcherUpdateSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherUpdateSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`WatcherUpdateSettingsRequest`](../types/WatcherUpdateSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherUpdateSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
