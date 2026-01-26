# Client.ilm.retry

Retry a policy. Retry running the lifecycle policy for an index that is in the ERROR step. The API sets the policy back to the step where the error occurred and runs the step. Use the explain lifecycle state API to determine whether an index is in the ERROR step.

## Method Signature

```typescript
client.ilm.retry(this: That, params: T.IlmRetryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmRetryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IlmRetryRequest`](../types/IlmRetryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmRetryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
