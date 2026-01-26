# Client.cluster.remoteInfo

Get remote cluster information. Get information about configured remote clusters. The API returns connection and endpoint information keyed by the configured remote cluster alias. > info > This API returns information that reflects current state on the local cluster. > The `connected` field does not necessarily reflect whether a remote cluster is down or unavailable, only whether there is currently an open connection to it. > Elasticsearch does not spontaneously try to reconnect to a disconnected remote cluster. > To trigger a reconnection, attempt a cross-cluster search, ES|QL cross-cluster search, or try the [resolve cluster endpoint](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-resolve-cluster).

## Method Signature

```typescript
client.cluster.remoteInfo(this: That, params?: T.ClusterRemoteInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterRemoteInfoResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterRemoteInfoRequest`](../types/ClusterRemoteInfoRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterRemoteInfoResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
