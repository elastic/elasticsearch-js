# SecurityUpdateApiKeyRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The ID of the API key to update. |
| `role_descriptors?` | `Record<string, SecurityRoleDescriptor>` | The role descriptors to assign to this API key.
The API key's effective permissions are an intersection of its assigned privileges and the point in time snapshot of permissions of the owner user.
You can assign new privileges by specifying them in this parameter.
To remove assigned privileges, you can supply an empty `role_descriptors` parameter, that is to say, an empty object `{}`.
If an API key has no assigned privileges, it inherits the owner user's full permissions.
The snapshot of the owner's permissions is always updated, whether you supply the `role_descriptors` parameter or not.
The structure of a role descriptor is the same as the request for the create API keys API. |
| `metadata?` | [`Metadata`](Metadata.md) | Arbitrary metadata that you want to associate with the API key.
It supports a nested data structure.
Within the metadata object, keys beginning with `_` are reserved for system usage.
When specified, this value fully replaces the metadata previously associated with the API key. |
| `expiration?` | [`Duration`](Duration.md) | The expiration time for the API key.
By default, API keys never expire.
This property can be omitted to leave the expiration unchanged. |
| `body?` | `string | { [key: string]: any } & { id?: never, role_descriptors?: never, metadata?: never, expiration?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, role_descriptors?: never, metadata?: never, expiration?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
