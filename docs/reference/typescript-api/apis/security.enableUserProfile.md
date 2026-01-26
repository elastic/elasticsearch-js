# Client.security.enableUserProfile

Enable a user profile. Enable user profiles to make them visible in user profile searches. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice. When you activate a user profile, it's automatically enabled and visible in user profile searches. If you later disable the user profile, you can use the enable user profile API to make the profile visible in these searches again.

## Method Signature

```typescript
client.security.enableUserProfile(this: That, params: T.SecurityEnableUserProfileRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityEnableUserProfileResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityEnableUserProfileRequest`](../types/SecurityEnableUserProfileRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityEnableUserProfileResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
