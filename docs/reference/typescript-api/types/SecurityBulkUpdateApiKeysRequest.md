# SecurityBulkUpdateApiKeysRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `expiration?` | [`Duration`](Duration.md) | Expiration time for the API keys.
By default, API keys never expire.
This property can be omitted to leave the value unchanged. |
| `ids` | `string | string[]` | The API key identifiers. |
| `metadata?` | [`Metadata`](Metadata.md) | Arbitrary nested metadata to associate with the API keys.
Within the `metadata` object, top-level keys beginning with an underscore (`_`) are reserved for system usage.
Any information specified with this parameter fully replaces metadata previously associated with the API key. |
| `role_descriptors?` | `Record<string, SecurityRoleDescriptor>` | The role descriptors to assign to the API keys.
An API key's effective permissions are an intersection of its assigned privileges and the point-in-time snapshot of permissions of the owner user.
You can assign new privileges by specifying them in this parameter.
To remove assigned privileges, supply the `role_descriptors` parameter as an empty object `{}`.
If an API key has no assigned privileges, it inherits the owner user's full permissions.
The snapshot of the owner's permissions is always updated, whether you supply the `role_descriptors` parameter.
The structure of a role descriptor is the same as the request for the create API keys API. |
| `body?` | `string | { [key: string]: any } & { expiration?: never, ids?: never, metadata?: never, role_descriptors?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { expiration?: never, ids?: never, metadata?: never, role_descriptors?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
