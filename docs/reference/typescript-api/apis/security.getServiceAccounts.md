# Client.security.getServiceAccounts

Get service accounts. Get a list of service accounts that match the provided path parameters. NOTE: Currently, only the `elastic/fleet-server` service account is available.

## Method Signature

```typescript
client.security.getServiceAccounts(this: That, params?: T.SecurityGetServiceAccountsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetServiceAccountsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetServiceAccountsRequest`](../types/SecurityGetServiceAccountsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetServiceAccountsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
