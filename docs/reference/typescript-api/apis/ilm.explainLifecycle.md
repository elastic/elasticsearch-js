# Client.ilm.explainLifecycle

Explain the lifecycle state. Get the current lifecycle status for one or more indices. For data streams, the API retrieves the current lifecycle status for the stream's backing indices. The response indicates when the index entered each lifecycle state, provides the definition of the running phase, and information about any failures.

## Method Signature

```typescript
client.ilm.explainLifecycle(this: That, params: T.IlmExplainLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmExplainLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IlmExplainLifecycleRequest`](../types/IlmExplainLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmExplainLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
