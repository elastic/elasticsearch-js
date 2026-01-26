# Client.indices.resolveCluster

Resolve the cluster. Resolve the specified index expressions to return information about each cluster, including the local "querying" cluster, if included. If no index expression is provided, the API will return information about all the remote clusters that are configured on the querying cluster. This endpoint is useful before doing a cross-cluster search in order to determine which remote clusters should be included in a search. You use the same index expression with this endpoint as you would for cross-cluster search. Index and cluster exclusions are also supported with this endpoint. For each cluster in the index expression, information is returned about: * Whether the querying ("local") cluster is currently connected to each remote cluster specified in the index expression. Note that this endpoint actively attempts to contact the remote clusters, unlike the `remote/info` endpoint. * Whether each remote cluster is configured with `skip_unavailable` as `true` or `false`. * Whether there are any indices, aliases, or data streams on that cluster that match the index expression. * Whether the search is likely to have errors returned when you do the cross-cluster search (including any authorization errors if you do not have permission to query the index). * Cluster version information, including the Elasticsearch server version. For example, `GET /_resolve/cluster/my-index-*,cluster*:my-index-*` returns information about the local cluster and all remotely configured clusters that start with the alias `cluster*`. Each cluster returns information about whether it has any indices, aliases or data streams that match `my-index-*`. ## Note on backwards compatibility The ability to query without an index expression was added in version 8.18, so when querying remote clusters older than that, the local cluster will send the index expression `dummy*` to those remote clusters. Thus, if an errors occur, you may see a reference to that index expression even though you didn't request it. If it causes a problem, you can instead include an index expression like `*:*` to bypass the issue. ## Advantages of using this endpoint before a cross-cluster search You may want to exclude a cluster or index from a search when: * A remote cluster is not currently connected and is configured with `skip_unavailable=false`. Running a cross-cluster search under those conditions will cause the entire search to fail. * A cluster has no matching indices, aliases or data streams for the index expression (or your user does not have permissions to search them). For example, suppose your index expression is `logs*,remote1:logs*` and the remote1 cluster has no indices, aliases or data streams that match `logs*`. In that case, that cluster will return no results from that cluster if you include it in a cross-cluster search. * The index expression (combined with any query parameters you specify) will likely cause an exception to be thrown when you do the search. In these cases, the "error" field in the `_resolve/cluster` response will be present. (This is also where security/permission errors will be shown.) * A remote cluster is an older version that does not support the feature you want to use in your search. ## Test availability of remote clusters The `remote/info` endpoint is commonly used to test whether the "local" cluster (the cluster being queried) is connected to its remote clusters, but it does not necessarily reflect whether the remote cluster is available or not. The remote cluster may be available, while the local cluster is not currently connected to it. You can use the `_resolve/cluster` API to attempt to reconnect to remote clusters. For example with `GET _resolve/cluster` or `GET _resolve/cluster/*:*`. The `connected` field in the response will indicate whether it was successful. If a connection was (re-)established, this will also cause the `remote/info` endpoint to now indicate a connected status.

## Method Signature

```typescript
client.indices.resolveCluster(this: That, params?: T.IndicesResolveClusterRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesResolveClusterResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesResolveClusterRequest`](../types/IndicesResolveClusterRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesResolveClusterResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
