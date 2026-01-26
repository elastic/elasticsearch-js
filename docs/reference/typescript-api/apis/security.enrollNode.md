# Client.security.enrollNode

Enroll a node. Enroll a new node to allow it to join an existing cluster with security features enabled. The response contains all the necessary information for the joining node to bootstrap discovery and security related settings so that it can successfully join the cluster. The response contains key and certificate material that allows the caller to generate valid signed certificates for the HTTP layer of all nodes in the cluster.

## Method Signature

```typescript
client.security.enrollNode(this: That, params?: T.SecurityEnrollNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityEnrollNodeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityEnrollNodeRequest`](../types/SecurityEnrollNodeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityEnrollNodeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
