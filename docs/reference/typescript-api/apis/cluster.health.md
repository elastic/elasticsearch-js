# Client.cluster.health

Get the cluster health status. You can also use the API to get the health status of only specified data streams and indices. For data streams, the API retrieves the health status of the stream’s backing indices. The cluster health status is: green, yellow or red. On the shard level, a red status indicates that the specific shard is not allocated in the cluster. Yellow means that the primary shard is allocated but replicas are not. Green means that all shards are allocated. The index level status is controlled by the worst shard status. One of the main benefits of the API is the ability to wait until the cluster reaches a certain high watermark health level. The cluster status is controlled by the worst index status.

## Method Signature

```typescript
client.cluster.health(this: That, params?: T.ClusterHealthRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterHealthResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterHealthRequest`](../types/ClusterHealthRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterHealthResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
