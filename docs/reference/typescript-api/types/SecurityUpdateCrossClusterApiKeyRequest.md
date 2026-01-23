# SecurityUpdateCrossClusterApiKeyRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The ID of the cross-cluster API key to update. |
| `access` | [`SecurityAccess`](SecurityAccess.md) | The access to be granted to this API key.
The access is composed of permissions for cross cluster search and cross cluster replication.
At least one of them must be specified.
When specified, the new access assignment fully replaces the previously assigned access. |
| `expiration?` | [`Duration`](Duration.md) | The expiration time for the API key.
By default, API keys never expire. This property can be omitted to leave the value unchanged. |
| `metadata?` | [`Metadata`](Metadata.md) | Arbitrary metadata that you want to associate with the API key.
It supports nested data structure.
Within the metadata object, keys beginning with `_` are reserved for system usage.
When specified, this information fully replaces metadata previously associated with the API key. |
| `certificate_identity?` | `string` | The certificate identity to associate with this API key.
This field is used to restrict the API key to connections authenticated by a specific TLS certificate.
The value should match the certificate's distinguished name (DN) pattern.
When specified, this fully replaces any previously assigned certificate identity.
To clear an existing certificate identity, explicitly set this field to `null`.
When omitted, the existing certificate identity remains unchanged. |
| `body?` | `string | { [key: string]: any } & { id?: never, access?: never, expiration?: never, metadata?: never, certificate_identity?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, access?: never, expiration?: never, metadata?: never, certificate_identity?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
