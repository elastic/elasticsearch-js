# Client.cat.circuitBreaker

Get circuit breakers statistics. IMPORTANT: CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications.

## Method Signature

```typescript
client.cat.circuitBreaker(this: That, params?: T.CatCircuitBreakerRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatCircuitBreakerResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatCircuitBreakerRequest`](../types/CatCircuitBreakerRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatCircuitBreakerResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
