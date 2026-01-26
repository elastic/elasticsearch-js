# Client.security.activateUserProfile

Activate a user profile. Create or update a user profile on behalf of another user. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. The calling application must have either an `access_token` or a combination of `username` and `password` for the user that the profile document is intended for. Elastic reserves the right to change or remove this feature in future releases without prior notice. This API creates or updates a profile document for end users with information that is extracted from the user's authentication object including `username`, `full_name,` `roles`, and the authentication realm. For example, in the JWT `access_token` case, the profile user's `username` is extracted from the JWT token claim pointed to by the `claims.principal` setting of the JWT realm that authenticated the token. When updating a profile document, the API enables the document if it was disabled. Any updates do not change existing content for either the `labels` or `data` fields.

## Method Signature

```typescript
client.security.activateUserProfile(this: That, params: T.SecurityActivateUserProfileRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityActivateUserProfileResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityActivateUserProfileRequest`](../types/SecurityActivateUserProfileRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityActivateUserProfileResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
