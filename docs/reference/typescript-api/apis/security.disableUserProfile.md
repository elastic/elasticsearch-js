# Client.security.disableUserProfile

Disable a user profile. Disable user profiles so that they are not visible in user profile searches. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice. When you activate a user profile, its automatically enabled and visible in user profile searches. You can use the disable user profile API to disable a user profile so it’s not visible in these searches. To re-enable a disabled user profile, use the enable user profile API .

## Method Signature

```typescript
client.security.disableUserProfile(this: That, params: T.SecurityDisableUserProfileRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityDisableUserProfileResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityDisableUserProfileRequest`](../types/SecurityDisableUserProfileRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityDisableUserProfileResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
