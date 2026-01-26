# Client.ping

Ping the cluster. Get information about whether the cluster is running.

## Method Signature

```typescript
client.ping(this: That, params?: T.PingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.PingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`PingRequest`](../types/PingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.PingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
