# Client.security.updateSettings

Update security index settings. Update the user-configurable settings for the security internal index (`.security` and associated indices). Only a subset of settings are allowed to be modified. This includes `index.auto_expand_replicas` and `index.number_of_replicas`. NOTE: If `index.auto_expand_replicas` is set, `index.number_of_replicas` will be ignored during updates. If a specific index is not in use on the system and settings are provided for it, the request will be rejected. This API does not yet support configuring the settings for indices before they are in use.

## Method Signature

```typescript
client.security.updateSettings(this: That, params?: T.SecurityUpdateSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityUpdateSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityUpdateSettingsRequest`](../types/SecurityUpdateSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityUpdateSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
