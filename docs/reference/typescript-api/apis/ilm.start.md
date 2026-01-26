# Client.ilm.start

Start the ILM plugin. Start the index lifecycle management plugin if it is currently stopped. ILM is started automatically when the cluster is formed. Restarting ILM is necessary only when it has been stopped using the stop ILM API.

## Method Signature

```typescript
client.ilm.start(this: That, params?: T.IlmStartRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmStartResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IlmStartRequest`](../types/IlmStartRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmStartResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
