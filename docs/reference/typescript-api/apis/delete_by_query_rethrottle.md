# Client.delete_by_query_rethrottle

Throttle a delete by query operation. Change the number of requests per second for a particular delete by query operation. Rethrottling that speeds up the query takes effect immediately but rethrotting that slows down the query takes effect after completing the current batch to prevent scroll timeouts.

## Method Signature

```typescript
client.delete_by_query_rethrottle(this: That, params: T.DeleteByQueryRethrottleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DeleteByQueryRethrottleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`DeleteByQueryRethrottleRequest`](../types/DeleteByQueryRethrottleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.DeleteByQueryRethrottleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
