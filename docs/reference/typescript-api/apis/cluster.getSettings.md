# Client.cluster.getSettings

Get cluster-wide settings. By default, it returns only settings that have been explicitly defined.

## Method Signature

```typescript
client.cluster.getSettings(this: That, params?: T.ClusterGetSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterGetSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterGetSettingsRequest`](../types/ClusterGetSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterGetSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
