# Client.reindex_rethrottle

Throttle a reindex operation. Change the number of requests per second for a particular reindex operation. For example: ``` POST _reindex/r1A2WoRbTwKZ516z6NEs5A:36619/_rethrottle?requests_per_second=-1 ``` Rethrottling that speeds up the query takes effect immediately. Rethrottling that slows down the query will take effect after completing the current batch. This behavior prevents scroll timeouts.

## Method Signature

```typescript
client.reindex_rethrottle(this: That, params: T.ReindexRethrottleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ReindexRethrottleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ReindexRethrottleRequest`](../types/ReindexRethrottleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ReindexRethrottleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
