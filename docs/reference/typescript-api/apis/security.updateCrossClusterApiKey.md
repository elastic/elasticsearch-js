# Client.security.updateCrossClusterApiKey

Update a cross-cluster API key. Update the attributes of an existing cross-cluster API key, which is used for API key based remote cluster access. To use this API, you must have at least the `manage_security` cluster privilege. Users can only update API keys that they created. To update another user's API key, use the `run_as` feature to submit a request on behalf of another user. IMPORTANT: It's not possible to use an API key as the authentication credential for this API. To update an API key, the owner user's credentials are required. It's not possible to update expired API keys, or API keys that have been invalidated by the invalidate API key API. This API supports updates to an API key's access scope, metadata, and expiration. The owner user's information, such as the `username` and `realm`, is also updated automatically on every call. NOTE: This API cannot update REST API keys, which should be updated by either the update API key or bulk update API keys API. To learn more about how to use this API, refer to the [Update cross cluter API key API examples page](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/update-cc-api-key-examples).

## Method Signature

```typescript
client.security.updateCrossClusterApiKey(this: That, params: T.SecurityUpdateCrossClusterApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityUpdateCrossClusterApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityUpdateCrossClusterApiKeyRequest`](../types/SecurityUpdateCrossClusterApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityUpdateCrossClusterApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
