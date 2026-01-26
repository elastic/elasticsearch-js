# Client.cat.allocation

Get shard allocation information. Get a snapshot of the number of shards allocated to each data node and their disk space. IMPORTANT: CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications.

## Method Signature

```typescript
client.cat.allocation(this: That, params?: T.CatAllocationRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatAllocationResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatAllocationRequest`](../types/CatAllocationRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatAllocationResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
