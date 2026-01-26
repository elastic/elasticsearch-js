# Client.security.updateApiKey

Update an API key. Update attributes of an existing API key. This API supports updates to an API key's access scope, expiration, and metadata. To use this API, you must have at least the `manage_own_api_key` cluster privilege. Users can only update API keys that they created or that were granted to them. To update another user’s API key, use the `run_as` feature to submit a request on behalf of another user. IMPORTANT: It's not possible to use an API key as the authentication credential for this API. The owner user’s credentials are required. Use this API to update API keys created by the create API key or grant API Key APIs. If you need to apply the same update to many API keys, you can use the bulk update API keys API to reduce overhead. It's not possible to update expired API keys or API keys that have been invalidated by the invalidate API key API. The access scope of an API key is derived from the `role_descriptors` you specify in the request and a snapshot of the owner user's permissions at the time of the request. The snapshot of the owner's permissions is updated automatically on every call. IMPORTANT: If you don't specify `role_descriptors` in the request, a call to this API might still change the API key's access scope. This change can occur if the owner user's permissions have changed since the API key was created or last modified.

## Method Signature

```typescript
client.security.updateApiKey(this: That, params: T.SecurityUpdateApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityUpdateApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityUpdateApiKeyRequest`](../types/SecurityUpdateApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityUpdateApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
