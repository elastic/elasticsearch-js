# Client.shutdown.getNode

Get the shutdown status. Get information about nodes that are ready to be shut down, have shut down preparations still in progress, or have stalled. The API returns status information for each part of the shut down process. NOTE: This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. If the operator privileges feature is enabled, you must be an operator to use this API.

## Method Signature

```typescript
client.shutdown.getNode(this: That, params?: T.ShutdownGetNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ShutdownGetNodeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ShutdownGetNodeRequest`](../types/ShutdownGetNodeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ShutdownGetNodeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
