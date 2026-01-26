# Client.cat.threadPool

Get thread pool statistics. Get thread pool statistics for each node in a cluster. Returned information includes all built-in thread pools and custom thread pools. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

## Method Signature

```typescript
client.cat.threadPool(this: That, params?: T.CatThreadPoolRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatThreadPoolResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatThreadPoolRequest`](../types/CatThreadPoolRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatThreadPoolResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
