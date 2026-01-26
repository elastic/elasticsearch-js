# Client.security.invalidateApiKey

Invalidate API keys. This API invalidates API keys created by the create API key or grant API key APIs. Invalidated API keys fail authentication, but they can still be viewed using the get API key information and query API key information APIs, for at least the configured retention period, until they are automatically deleted. To use this API, you must have at least the `manage_security`, `manage_api_key`, or `manage_own_api_key` cluster privileges. The `manage_security` privilege allows deleting any API key, including both REST and cross cluster API keys. The `manage_api_key` privilege allows deleting any REST API key, but not cross cluster API keys. The `manage_own_api_key` only allows deleting REST API keys that are owned by the user. In addition, with the `manage_own_api_key` privilege, an invalidation request must be issued in one of the three formats: - Set the parameter `owner=true`. - Or, set both `username` and `realm_name` to match the user's identity. - Or, if the request is issued by an API key, that is to say an API key invalidates itself, specify its ID in the `ids` field.

## Method Signature

```typescript
client.security.invalidateApiKey(this: That, params?: T.SecurityInvalidateApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityInvalidateApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityInvalidateApiKeyRequest`](../types/SecurityInvalidateApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityInvalidateApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
