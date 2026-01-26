# Client.cat.master

Get master node information. Get information about the master node, including the ID, bound IP address, and name. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

## Method Signature

```typescript
client.cat.master(this: That, params?: T.CatMasterRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatMasterResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatMasterRequest`](../types/CatMasterRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatMasterResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
