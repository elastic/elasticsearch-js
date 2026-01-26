# Client.security.suggestUserProfiles

Suggest a user profile. Get suggestions for user profiles that match specified search criteria. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.

## Method Signature

```typescript
client.security.suggestUserProfiles(this: That, params?: T.SecuritySuggestUserProfilesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySuggestUserProfilesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecuritySuggestUserProfilesRequest`](../types/SecuritySuggestUserProfilesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySuggestUserProfilesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
