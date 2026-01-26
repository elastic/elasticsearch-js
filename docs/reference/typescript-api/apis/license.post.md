# Client.license.post

Update the license. You can update your license at runtime without shutting down your nodes. License updates take effect immediately. If the license you are installing does not support all of the features that were available with your previous license, however, you are notified in the response. You must then re-submit the API request with the acknowledge parameter set to true. NOTE: If Elasticsearch security features are enabled and you are installing a gold or higher license, you must enable TLS on the transport networking layer before you install the license. If the operator privileges feature is enabled, only operator users can use this API.

## Method Signature

```typescript
client.license.post(this: That, params?: T.LicensePostRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LicensePostResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`LicensePostRequest`](../types/LicensePostRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LicensePostResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
