# Client.security.hasPrivilegesUserProfile

Check user profile privileges. Determine whether the users associated with the specified user profile IDs have all the requested privileges. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.

## Method Signature

```typescript
client.security.hasPrivilegesUserProfile(this: That, params: T.SecurityHasPrivilegesUserProfileRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityHasPrivilegesUserProfileResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityHasPrivilegesUserProfileRequest`](../types/SecurityHasPrivilegesUserProfileRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityHasPrivilegesUserProfileResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
