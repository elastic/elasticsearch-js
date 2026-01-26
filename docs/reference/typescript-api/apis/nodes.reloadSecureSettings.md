# Client.nodes.reloadSecureSettings

Reload the keystore on nodes in the cluster. Secure settings are stored in an on-disk keystore. Certain of these settings are reloadable. That is, you can change them on disk and reload them without restarting any nodes in the cluster. When you have updated reloadable secure settings in your keystore, you can use this API to reload those settings on each node. When the Elasticsearch keystore is password protected and not simply obfuscated, you must provide the password for the keystore when you reload the secure settings. Reloading the settings for the whole cluster assumes that the keystores for all nodes are protected with the same password; this method is allowed only when inter-node communications are encrypted. Alternatively, you can reload the secure settings on each node by locally accessing the API and passing the node-specific Elasticsearch keystore password.

## Method Signature

```typescript
client.nodes.reloadSecureSettings(this: That, params?: T.NodesReloadSecureSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesReloadSecureSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`NodesReloadSecureSettingsRequest`](../types/NodesReloadSecureSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.NodesReloadSecureSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
