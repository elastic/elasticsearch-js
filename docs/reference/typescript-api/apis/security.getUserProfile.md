# Client.security.getUserProfile

Get a user profile. Get a user's profile using the unique profile ID. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.

## Method Signature

```typescript
client.security.getUserProfile(this: That, params: T.SecurityGetUserProfileRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityGetUserProfileResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityGetUserProfileRequest`](../types/SecurityGetUserProfileRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityGetUserProfileResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
