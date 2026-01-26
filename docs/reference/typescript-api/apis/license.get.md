# Client.license.get

Get license information. Get information about your Elastic license including its type, its status, when it was issued, and when it expires. >info > If the master node is generating a new cluster state, the get license API may return a `404 Not Found` response. > If you receive an unexpected 404 response after cluster startup, wait a short period and retry the request.

## Method Signature

```typescript
client.license.get(this: That, params?: T.LicenseGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LicenseGetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`LicenseGetRequest`](../types/LicenseGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.LicenseGetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
