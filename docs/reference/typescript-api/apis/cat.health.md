# Client.cat.health

Get the cluster health status. IMPORTANT: CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the cluster health API. This API is often used to check malfunctioning clusters. To help you track cluster health alongside log files and alerting systems, the API returns timestamps in two formats: `HH:MM:SS`, which is human-readable but includes no date information; `Unix epoch time`, which is machine-sortable and includes date information. The latter format is useful for cluster recoveries that take multiple days. You can use the cat health API to verify cluster health across multiple nodes. You also can use the API to track the recovery of a large cluster over a longer period of time.

## Method Signature

```typescript
client.cat.health(this: That, params?: T.CatHealthRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatHealthResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatHealthRequest`](../types/CatHealthRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatHealthResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
