# Client.cat.nodeattrs

Get node attribute information. Get information about custom node attributes. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

## Method Signature

```typescript
client.cat.nodeattrs(this: That, params?: T.CatNodeattrsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatNodeattrsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatNodeattrsRequest`](../types/CatNodeattrsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatNodeattrsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
