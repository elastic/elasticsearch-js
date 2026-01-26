# SecurityGrantApiKeyGrantApiKey

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | - |
| `expiration?` | [`DurationLarge`](DurationLarge.md) | Expiration time for the API key. By default, API keys never expire. |
| `role_descriptors?` | `Record<string, SecurityRoleDescriptor> | Record<string, SecurityRoleDescriptor>`[] | The role descriptors for this API key.
When it is not specified or is an empty array, the API key has a point in time snapshot of permissions of the specified user or access token.
If you supply role descriptors, the resultant permissions are an intersection of API keys permissions and the permissions of the user or access token. |
| `metadata?` | [`Metadata`](Metadata.md) | Arbitrary metadata that you want to associate with the API key.
It supports nested data structure.
Within the `metadata` object, keys beginning with `_` are reserved for system usage. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
