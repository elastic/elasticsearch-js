# Client.security.queryApiKeys

Find API keys with a query. Get a paginated list of API keys and their information. You can optionally filter the results with a query. To use this API, you must have at least the `manage_own_api_key` or the `read_security` cluster privileges. If you have only the `manage_own_api_key` privilege, this API returns only the API keys that you own. If you have the `read_security`, `manage_api_key`, or greater privileges (including `manage_security`), this API returns all API keys regardless of ownership. Refer to the linked documentation for examples of how to find API keys:

## Method Signature

```typescript
client.security.queryApiKeys(this: That, params?: T.SecurityQueryApiKeysRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityQueryApiKeysResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityQueryApiKeysRequest`](../types/SecurityQueryApiKeysRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityQueryApiKeysResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
