# Client.cat.nodes

Get node information. Get information about the nodes in a cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

## Method Signature

```typescript
client.cat.nodes(this: That, params?: T.CatNodesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatNodesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatNodesRequest`](../types/CatNodesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatNodesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
