# Client.xpack.usage

Get usage information. Get information about the features that are currently enabled and available under the current license. The API also provides some usage statistics.

## Method Signature

```typescript
client.xpack.usage(this: That, params?: T.XpackUsageRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.XpackUsageResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`XpackUsageRequest`](../types/XpackUsageRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.XpackUsageResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
