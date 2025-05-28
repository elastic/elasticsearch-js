# `SecurityUpdateCrossClusterApiKeyRequest` [interface-SecurityUpdateCrossClusterApiKeyRequest]

| Name | Type | Description |
| - | - | - |
| `access` | [SecurityAccess](./SecurityAccess.md) | The access to be granted to this API key. The access is composed of permissions for cross cluster search and cross cluster replication. At least one of them must be specified. When specified, the new access assignment fully replaces the previously assigned access. |
| `body` | string | ({ [key: string]: any; } & { id?: never; access?: never; expiration?: never; metadata?: never; }) | All values in `body` will be added to the request body. |
| `expiration` | [Duration](./Duration.md) | The expiration time for the API key. By default, API keys never expire. This property can be omitted to leave the value unchanged. |
| `id` | [Id](./Id.md) | The ID of the cross-cluster API key to update. |
| `metadata` | [Metadata](./Metadata.md) | Arbitrary metadata that you want to associate with the API key. It supports nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage. When specified, this information fully replaces metadata previously associated with the API key. |
| `querystring` | { [key: string]: any; } & { id?: never; access?: never; expiration?: never; metadata?: never; } | All values in `querystring` will be added to the request querystring. |
