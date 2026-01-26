# Client.slm.start

Start snapshot lifecycle management. Snapshot lifecycle management (SLM) starts automatically when a cluster is formed. Manually starting SLM is necessary only if it has been stopped using the stop SLM API.

## Method Signature

```typescript
client.slm.start(this: That, params?: T.SlmStartRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SlmStartResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SlmStartRequest`](../types/SlmStartRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SlmStartResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
