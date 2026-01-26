# Client.cat.shards

Get shard information. Get information about the shards in a cluster. For data streams, the API returns information about the backing indices. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications.

## Method Signature

```typescript
client.cat.shards(this: That, params?: T.CatShardsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatShardsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatShardsRequest`](../types/CatShardsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatShardsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
