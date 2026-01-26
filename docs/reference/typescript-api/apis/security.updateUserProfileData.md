# Client.security.updateUserProfileData

Update user profile data. Update specific data for the user profile that is associated with a unique ID. NOTE: The user profile feature is designed only for use by Kibana and Elastic's Observability, Enterprise Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice. To use this API, you must have one of the following privileges: * The `manage_user_profile` cluster privilege. * The `update_profile_data` global privilege for the namespaces that are referenced in the request. This API updates the `labels` and `data` fields of an existing user profile document with JSON objects. New keys and their values are added to the profile document and conflicting keys are replaced by data that's included in the request. For both labels and data, content is namespaced by the top-level fields. The `update_profile_data` global privilege grants privileges for updating only the allowed namespaces.

## Method Signature

```typescript
client.security.updateUserProfileData(this: That, params: T.SecurityUpdateUserProfileDataRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityUpdateUserProfileDataResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityUpdateUserProfileDataRequest`](../types/SecurityUpdateUserProfileDataRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityUpdateUserProfileDataResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
