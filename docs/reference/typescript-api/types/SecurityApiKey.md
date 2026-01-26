# SecurityApiKey

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | Id for the API key |
| `name` | [`Name`](Name.md) | Name of the API key. |
| `type` | [`SecurityApiKeyType`](SecurityApiKeyType.md) | The type of the API key (e.g. `rest` or `cross_cluster`). |
| `creation` | [`EpochTime`](EpochTime.md)<UnitMillis> | Creation time for the API key in milliseconds. |
| `expiration?` | [`EpochTime`](EpochTime.md)<UnitMillis> | Expiration time for the API key in milliseconds. |
| `invalidated` | `boolean` | Invalidation status for the API key.
If the key has been invalidated, it has a value of `true`. Otherwise, it is `false`. |
| `invalidation?` | [`EpochTime`](EpochTime.md)<UnitMillis> | If the key has been invalidated, invalidation time in milliseconds. |
| `username` | [`Username`](Username.md) | Principal for which this API key was created |
| `realm` | `string` | Realm name of the principal for which this API key was created. |
| `realm_type?` | `string` | Realm type of the principal for which this API key was created |
| `metadata` | [`Metadata`](Metadata.md) | Metadata of the API key |
| `role_descriptors?` | `Record<string, SecurityRoleDescriptor>` | The role descriptors assigned to this API key when it was created or last updated.
An empty role descriptor means the API key inherits the owner user’s permissions. |
| `limited_by?` | `Record<string, SecurityRoleDescriptor>`[] | The owner user’s permissions associated with the API key.
It is a point-in-time snapshot captured at creation and subsequent updates.
An API key’s effective permissions are an intersection of its assigned privileges and the owner user’s permissions. |
| `access?` | [`SecurityAccess`](SecurityAccess.md) | The access granted to cross-cluster API keys.
The access is composed of permissions for cross cluster search and cross cluster replication.
At least one of them must be specified.
When specified, the new access assignment fully replaces the previously assigned access. |
| `certificate_identity?` | `string` | The certificate identity associated with a cross-cluster API key.
Restricts the API key to connections authenticated by a specific TLS certificate.
Only applicable to cross-cluster API keys. |
| `profile_uid?` | `string` | The profile uid for the API key owner principal, if requested and if it exists |
| `_sort?` | [`SortResults`](SortResults.md) | Sorting values when using the `sort` parameter with the `security.query_api_keys` API. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
