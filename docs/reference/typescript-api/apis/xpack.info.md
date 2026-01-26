# Client.xpack.info

Get information. The information provided by the API includes: * Build information including the build number and timestamp. * License information about the currently installed license. * Feature information for the features that are currently enabled and available under the current license.

## Method Signature

```typescript
client.xpack.info(this: That, params?: T.XpackInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.XpackInfoResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`XpackInfoRequest`](../types/XpackInfoRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.XpackInfoResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
