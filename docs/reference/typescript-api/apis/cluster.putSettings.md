# Client.cluster.putSettings

Update the cluster settings. Configure and update dynamic settings on a running cluster. You can also configure dynamic settings locally on an unstarted or shut down node in `elasticsearch.yml`. Updates made with this API can be persistent, which apply across cluster restarts, or transient, which reset after a cluster restart. You can also reset transient or persistent settings by assigning them a null value. If you configure the same setting using multiple methods, Elasticsearch applies the settings in following order of precedence: 1) Transient setting; 2) Persistent setting; 3) `elasticsearch.yml` setting; 4) Default setting value. For example, you can apply a transient setting to override a persistent setting or `elasticsearch.yml` setting. However, a change to an `elasticsearch.yml` setting will not override a defined transient or persistent setting. TIP: In Elastic Cloud, use the user settings feature to configure all cluster settings. This method automatically rejects unsafe settings that could break your cluster. If you run Elasticsearch on your own hardware, use this API to configure dynamic cluster settings. Only use `elasticsearch.yml` for static cluster settings and node settings. The API doesn’t require a restart and ensures a setting’s value is the same on all nodes. WARNING: Transient cluster settings are no longer recommended. Use persistent cluster settings instead. If a cluster becomes unstable, transient settings can clear unexpectedly, resulting in a potentially undesired cluster configuration.

## Method Signature

```typescript
client.cluster.putSettings(this: That, params?: T.ClusterPutSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterPutSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterPutSettingsRequest`](../types/ClusterPutSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterPutSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
