# Client.license.delete

Delete the license. When the license expires, your subscription level reverts to Basic. If the operator privileges feature is enabled, only operator users can use this API.

## Method Signature

```typescript
client.license.delete(this: That, params?: T.LicenseDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LicenseDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`LicenseDeleteRequest`](../types/LicenseDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LicenseDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
