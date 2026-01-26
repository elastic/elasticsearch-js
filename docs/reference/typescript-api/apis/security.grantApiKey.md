# Client.security.grantApiKey

Grant an API key. Create an API key on behalf of another user. This API is similar to the create API keys API, however it creates the API key for a user that is different than the user that runs the API. The caller must have authentication credentials for the user on whose behalf the API key will be created. It is not possible to use this API to create an API key without that user's credentials. The supported user authentication credential types are: * username and password * Elasticsearch access tokens * JWTs The user, for whom the authentication credentials is provided, can optionally "run as" (impersonate) another user. In this case, the API key will be created on behalf of the impersonated user. This API is intended be used by applications that need to create and manage API keys for end users, but cannot guarantee that those users have permission to create API keys on their own behalf. The API keys are created by the Elasticsearch API key service, which is automatically enabled. A successful grant API key API call returns a JSON structure that contains the API key, its unique id, and its name. If applicable, it also returns expiration information for the API key in milliseconds. By default, API keys never expire. You can specify expiration information when you create the API keys.

## Method Signature

```typescript
client.security.grantApiKey(this: That, params: T.SecurityGrantApiKeyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGrantApiKeyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityGrantApiKeyRequest`](../types/SecurityGrantApiKeyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGrantApiKeyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
