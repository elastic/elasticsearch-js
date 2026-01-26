# Client.security.getApiKey

Get API key information. Retrieves information for one or more API keys. NOTE: If you have only the `manage_own_api_key` privilege, this API returns only the API keys that you own. If you have `read_security`, `manage_api_key` or greater privileges (including `manage_security`), this API returns all API keys regardless of ownership.

## Method Signature

```typescript
client.security.getApiKey(this: That, params?: T.SecurityGetApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityGetApiKeyRequest`](../types/SecurityGetApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
