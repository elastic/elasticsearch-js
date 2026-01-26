# Client.security.getSettings

Get security index settings. Get the user-configurable settings for the security internal index (`.security` and associated indices). Only a subset of the index settings — those that are user-configurable—will be shown. This includes: * `index.auto_expand_replicas` * `index.number_of_replicas`

## Method Signature

```typescript
client.security.getSettings(this: That, params?: T.SecurityGetSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetSettingsRequest`](../types/SecurityGetSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
