# Client.shutdown.putNode

Prepare a node to be shut down. NOTE: This feature is designed for indirect use by Elastic Cloud, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. If you specify a node that is offline, it will be prepared for shut down when it rejoins the cluster. If the operator privileges feature is enabled, you must be an operator to use this API. The API migrates ongoing tasks and index shards to other nodes as needed to prepare a node to be restarted or shut down and removed from the cluster. This ensures that Elasticsearch can be stopped safely with minimal disruption to the cluster. You must specify the type of shutdown: `restart`, `remove`, or `replace`. If a node is already being prepared for shutdown, you can use this API to change the shutdown type. IMPORTANT: This API does NOT terminate the Elasticsearch process. Monitor the node shutdown status to determine when it is safe to stop Elasticsearch.

## Method Signature

```typescript
client.shutdown.putNode(this: That, params: T.ShutdownPutNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ShutdownPutNodeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ShutdownPutNodeRequest`](../types/ShutdownPutNodeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ShutdownPutNodeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
