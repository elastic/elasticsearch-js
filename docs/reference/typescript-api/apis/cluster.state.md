# Client.cluster.state

Get the cluster state. Get comprehensive information about the state of the cluster. The cluster state is an internal data structure which keeps track of a variety of information needed by every node, including the identity and attributes of the other nodes in the cluster; cluster-wide settings; index metadata, including the mapping and settings for each index; the location and status of every shard copy in the cluster. The elected master node ensures that every node in the cluster has a copy of the same cluster state. This API lets you retrieve a representation of this internal state for debugging or diagnostic purposes. You may need to consult the Elasticsearch source code to determine the precise meaning of the response. By default the API will route requests to the elected master node since this node is the authoritative source of cluster states. You can also retrieve the cluster state held on the node handling the API request by adding the `?local=true` query parameter. Elasticsearch may need to expend significant effort to compute a response to this API in larger clusters, and the response may comprise a very large quantity of data. If you use this API repeatedly, your cluster may become unstable. WARNING: The response is a representation of an internal data structure. Its format is not subject to the same compatibility guarantees as other more stable APIs and may change from version to version. Do not query this API using external monitoring tools. Instead, obtain the information you require using other more stable cluster APIs.

## Method Signature

```typescript
client.cluster.state(this: That, params?: T.ClusterStateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterStateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterStateRequest`](../types/ClusterStateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterStateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
