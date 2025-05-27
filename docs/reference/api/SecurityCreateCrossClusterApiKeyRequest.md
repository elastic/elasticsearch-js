## Interface `SecurityCreateCrossClusterApiKeyRequest`

| Name | Type | Description |
| - | - | - |
| `access` | [SecurityAccess](./SecurityAccess.md) | The access to be granted to this API key. The access is composed of permissions for cross-cluster search and cross-cluster replication. At least one of them must be specified. NOTE: No explicit privileges should be specified for either search or replication access. The creation process automatically converts the access specification to a role descriptor which has relevant privileges assigned accordingly. |
| `body` | string | ({ [key: string]: any; } & { access?: never; expiration?: never; metadata?: never; name?: never; }) | All values in `body` will be added to the request body. |
| `expiration` | [Duration](./Duration.md) | Expiration time for the API key. By default, API keys never expire. |
| `metadata` | [Metadata](./Metadata.md) | Arbitrary metadata that you want to associate with the API key. It supports nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage. |
| `name` | [Name](./Name.md) | Specifies the name for this API key. |
| `querystring` | { [key: string]: any; } & { access?: never; expiration?: never; metadata?: never; name?: never; } | All values in `querystring` will be added to the request querystring. |
