# Client.license.postStartBasic

Start a basic license. Start an indefinite basic license, which gives access to all the basic features. NOTE: In order to start a basic license, you must not currently have a basic license. If the basic license does not support all of the features that are available with your current license, however, you are notified in the response. You must then re-submit the API request with the `acknowledge` parameter set to `true`. To check the status of your basic license, use the get basic license API.

## Method Signature

```typescript
client.license.postStartBasic(this: That, params?: T.LicensePostStartBasicRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LicensePostStartBasicResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`LicensePostStartBasicRequest`](../types/LicensePostStartBasicRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LicensePostStartBasicResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
