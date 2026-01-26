# Client.watcher.getSettings

Get Watcher index settings. Get settings for the Watcher internal index (`.watches`). Only a subset of settings are shown, for example `index.auto_expand_replicas` and `index.number_of_replicas`.

## Method Signature

```typescript
client.watcher.getSettings(this: That, params?: T.WatcherGetSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherGetSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`WatcherGetSettingsRequest`](../types/WatcherGetSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherGetSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
