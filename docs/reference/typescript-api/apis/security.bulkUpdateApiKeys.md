# Client.security.bulkUpdateApiKeys

Bulk update API keys. Update the attributes for multiple API keys. IMPORTANT: It is not possible to use an API key as the authentication credential for this API. To update API keys, the owner user's credentials are required. This API is similar to the update API key API but enables you to apply the same update to multiple API keys in one API call. This operation can greatly improve performance over making individual updates. It is not possible to update expired or invalidated API keys. This API supports updates to API key access scope, metadata and expiration. The access scope of each API key is derived from the `role_descriptors` you specify in the request and a snapshot of the owner user's permissions at the time of the request. The snapshot of the owner's permissions is updated automatically on every call. IMPORTANT: If you don't specify `role_descriptors` in the request, a call to this API might still change an API key's access scope. This change can occur if the owner user's permissions have changed since the API key was created or last modified. A successful request returns a JSON structure that contains the IDs of all updated API keys, the IDs of API keys that already had the requested changes and did not require an update, and error details for any failed update.

## Method Signature

```typescript
client.security.bulkUpdateApiKeys(this: That, params: T.SecurityBulkUpdateApiKeysRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityBulkUpdateApiKeysResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityBulkUpdateApiKeysRequest`](../types/SecurityBulkUpdateApiKeysRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityBulkUpdateApiKeysResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
