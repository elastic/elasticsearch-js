# Client.security.createCrossClusterApiKey

Create a cross-cluster API key. Create an API key of the `cross_cluster` type for the API key based remote cluster access. A `cross_cluster` API key cannot be used to authenticate through the REST interface. IMPORTANT: To authenticate this request you must use a credential that is not an API key. Even if you use an API key that has the required privilege, the API returns an error. Cross-cluster API keys are created by the Elasticsearch API key service, which is automatically enabled. NOTE: Unlike REST API keys, a cross-cluster API key does not capture permissions of the authenticated user. The API key’s effective permission is exactly as specified with the `access` property. A successful request returns a JSON structure that contains the API key, its unique ID, and its name. If applicable, it also returns expiration information for the API key in milliseconds. By default, API keys never expire. You can specify expiration information when you create the API keys. Cross-cluster API keys can only be updated with the update cross-cluster API key API. Attempting to update them with the update REST API key API or the bulk update REST API keys API will result in an error.

## Method Signature

```typescript
client.security.createCrossClusterApiKey(this: That, params: T.SecurityCreateCrossClusterApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityCreateCrossClusterApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityCreateCrossClusterApiKeyRequest`](../types/SecurityCreateCrossClusterApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityCreateCrossClusterApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
