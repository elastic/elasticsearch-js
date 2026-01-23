# SearchShardsSearchShardsNodeAttributes

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`NodeName`](NodeName.md) | The human-readable identifier of the node. |
| `ephemeral_id` | [`Id`](Id.md) | The ephemeral ID of the node. |
| `transport_address` | [`TransportAddress`](TransportAddress.md) | The host and port where transport HTTP connections are accepted. |
| `external_id` | `string` | - |
| `attributes` | `Record<string, string>` | Lists node attributes. |
| `roles` | [`NodeRoles`](NodeRoles.md) | - |
| `version` | [`VersionString`](VersionString.md) | - |
| `min_index_version` | [`integer`](integer.md) | - |
| `max_index_version` | [`integer`](integer.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
