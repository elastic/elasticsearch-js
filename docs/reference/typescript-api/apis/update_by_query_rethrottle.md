# Client.update_by_query_rethrottle

Throttle an update by query operation. Change the number of requests per second for a particular update by query operation. Rethrottling that speeds up the query takes effect immediately but rethrotting that slows down the query takes effect after completing the current batch to prevent scroll timeouts.

## Method Signature

```typescript
client.update_by_query_rethrottle(this: That, params: T.UpdateByQueryRethrottleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.UpdateByQueryRethrottleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`UpdateByQueryRethrottleRequest`](../types/UpdateByQueryRethrottleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.UpdateByQueryRethrottleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
