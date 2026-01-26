# Client.security.createApiKey

Create an API key. Create an API key for access without requiring basic authentication. IMPORTANT: If the credential that is used to authenticate this request is an API key, the derived API key cannot have any privileges. If you specify privileges, the API returns an error. A successful request returns a JSON structure that contains the API key, its unique id, and its name. If applicable, it also returns expiration information for the API key in milliseconds. NOTE: By default, API keys never expire. You can specify expiration information when you create the API keys. The API keys are created by the Elasticsearch API key service, which is automatically enabled. To configure or turn off the API key service, refer to API key service setting documentation.

## Method Signature

```typescript
client.security.createApiKey(this: That, params?: T.SecurityCreateApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityCreateApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecurityCreateApiKeyRequest`](../types/SecurityCreateApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityCreateApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
