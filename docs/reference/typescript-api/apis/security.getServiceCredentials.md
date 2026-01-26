# Client.security.getServiceCredentials

Get service account credentials. To use this API, you must have at least the `read_security` cluster privilege (or a greater privilege such as `manage_service_account` or `manage_security`). The response includes service account tokens that were created with the create service account tokens API as well as file-backed tokens from all nodes of the cluster. NOTE: For tokens backed by the `service_tokens` file, the API collects them from all nodes of the cluster. Tokens with the same name from different nodes are assumed to be the same token and are only counted once towards the total number of service tokens.

## Method Signature

```typescript
client.security.getServiceCredentials(this: That, params: T.SecurityGetServiceCredentialsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetServiceCredentialsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityGetServiceCredentialsRequest`](../types/SecurityGetServiceCredentialsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetServiceCredentialsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
