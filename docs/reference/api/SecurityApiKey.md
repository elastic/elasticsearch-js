## Interface `SecurityApiKey`

| Name | Type | Description |
| - | - | - |
| `_sort` | [SortResults](./SortResults.md) | Sorting values when using the `sort` parameter with the `security.query_api_keys` API. |
| `access` | [SecurityAccess](./SecurityAccess.md) | The access granted to cross-cluster API keys. The access is composed of permissions for cross cluster search and cross cluster replication. At least one of them must be specified. When specified, the new access assignment fully replaces the previously assigned access. |
| `creation` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | Creation time for the API key in milliseconds. |
| `expiration` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | Expiration time for the API key in milliseconds. |
| `id` | [Id](./Id.md) | Id for the API key |
| `invalidated` | boolean | Invalidation status for the API key. If the key has been invalidated, it has a value of `true`. Otherwise, it is `false`. |
| `invalidation` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | If the key has been invalidated, invalidation time in milliseconds. |
| `limited_by` | Record<string, [SecurityRoleDescriptor](./SecurityRoleDescriptor.md)>[] | The owner user’s permissions associated with the API key. It is a point-in-time snapshot captured at creation and subsequent updates. An API key’s effective permissions are an intersection of its assigned privileges and the owner user’s permissions. |
| `metadata` | [Metadata](./Metadata.md) | Metadata of the API key |
| `name` | [Name](./Name.md) | Name of the API key. |
| `profile_uid` | string | The profile uid for the API key owner principal, if requested and if it exists |
| `realm_type` | string | Realm type of the principal for which this API key was created |
| `realm` | string | Realm name of the principal for which this API key was created. |
| `role_descriptors` | Record<string, [SecurityRoleDescriptor](./SecurityRoleDescriptor.md)> | The role descriptors assigned to this API key when it was created or last updated. An empty role descriptor means the API key inherits the owner user’s permissions. |
| `type` | [SecurityApiKeyType](./SecurityApiKeyType.md) | The type of the API key (e.g. `rest` or `cross_cluster`). |
| `username` | [Username](./Username.md) | Principal for which this API key was created |
