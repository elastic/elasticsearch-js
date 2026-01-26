# Client.cat.fielddata

Get field data cache information. Get the amount of heap memory currently used by the field data cache on every data node in the cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes stats API.

## Method Signature

```typescript
client.cat.fielddata(this: That, params?: T.CatFielddataRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatFielddataResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatFielddataRequest`](../types/CatFielddataRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatFielddataResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
