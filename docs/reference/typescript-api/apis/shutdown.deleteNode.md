# Client.shutdown.deleteNode

Cancel node shutdown preparations. Remove a node from the shutdown list so it can resume normal operations. You must explicitly clear the shutdown request when a node rejoins the cluster or when a node has permanently left the cluster. Shutdown requests are never removed automatically by Elasticsearch. NOTE: This feature is designed for indirect use by Elastic Cloud, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported. If the operator privileges feature is enabled, you must be an operator to use this API.

## Method Signature

```typescript
client.shutdown.deleteNode(this: That, params: T.ShutdownDeleteNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ShutdownDeleteNodeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ShutdownDeleteNodeRequest`](../types/ShutdownDeleteNodeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ShutdownDeleteNodeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
