# Client.ilm.stop

Stop the ILM plugin. Halt all lifecycle management operations and stop the index lifecycle management plugin. This is useful when you are performing maintenance on the cluster and need to prevent ILM from performing any actions on your indices. The API returns as soon as the stop request has been acknowledged, but the plugin might continue to run until in-progress operations complete and the plugin can be safely stopped. Use the get ILM status API to check whether ILM is running.

## Method Signature

```typescript
client.ilm.stop(this: That, params?: T.IlmStopRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmStopResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IlmStopRequest`](../types/IlmStopRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmStopResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
