# Client.slm.stop

Stop snapshot lifecycle management. Stop all snapshot lifecycle management (SLM) operations and the SLM plugin. This API is useful when you are performing maintenance on a cluster and need to prevent SLM from performing any actions on your data streams or indices. Stopping SLM does not stop any snapshots that are in progress. You can manually trigger snapshots with the run snapshot lifecycle policy API even if SLM is stopped. The API returns a response as soon as the request is acknowledged, but the plugin might continue to run until in-progress operations complete and it can be safely stopped. Use the get snapshot lifecycle management status API to see if SLM is running.

## Method Signature

```typescript
client.slm.stop(this: That, params?: T.SlmStopRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SlmStopResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SlmStopRequest`](../types/SlmStopRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SlmStopResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
