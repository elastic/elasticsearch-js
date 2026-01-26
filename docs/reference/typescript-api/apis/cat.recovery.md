# Client.cat.recovery

Get shard recovery information. Get information about ongoing and completed shard recoveries. Shard recovery is the process of initializing a shard copy, such as restoring a primary shard from a snapshot or syncing a replica shard from a primary shard. When a shard recovery completes, the recovered shard is available for search and indexing. For data streams, the API returns information about the stream’s backing indices. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the index recovery API.

## Method Signature

```typescript
client.cat.recovery(this: That, params?: T.CatRecoveryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatRecoveryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatRecoveryRequest`](../types/CatRecoveryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatRecoveryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
