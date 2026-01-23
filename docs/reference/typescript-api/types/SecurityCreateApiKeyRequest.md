# SecurityCreateApiKeyRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `refresh?` | [`Refresh`](Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `expiration?` | [`Duration`](Duration.md) | The expiration time for the API key.
By default, API keys never expire. |
| `name?` | [`Name`](Name.md) | A name for the API key. |
| `role_descriptors?` | `Record<string, SecurityRoleDescriptor>` | An array of role descriptors for this API key.
When it is not specified or it is an empty array, the API key will have a point in time snapshot of permissions of the authenticated user.
If you supply role descriptors, the resultant permissions are an intersection of API keys permissions and the authenticated user's permissions thereby limiting the access scope for API keys.
The structure of role descriptor is the same as the request for the create role API.
For more details, refer to the create or update roles API.

NOTE: Due to the way in which this permission intersection is calculated, it is not possible to create an API key that is a child of another API key, unless the derived key is created without any privileges.
In this case, you must explicitly specify a role descriptor with no privileges.
The derived API key can be used for authentication; it will not have authority to call Elasticsearch APIs. |
| `metadata?` | [`Metadata`](Metadata.md) | Arbitrary metadata that you want to associate with the API key. It supports nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage. |
| `body?` | `string | { [key: string]: any } & { refresh?: never, expiration?: never, name?: never, role_descriptors?: never, metadata?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { refresh?: never, expiration?: never, name?: never, role_descriptors?: never, metadata?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
