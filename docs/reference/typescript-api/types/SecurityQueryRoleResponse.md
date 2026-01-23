# SecurityQueryRoleResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total` | [`integer`](integer.md) | The total number of roles found. |
| `count` | [`integer`](integer.md) | The number of roles returned in the response. |
| `roles` | [`SecurityQueryRoleQueryRole`](SecurityQueryRoleQueryRole.md)[] | A list of roles that match the query.
The returned role format is an extension of the role definition format.
It adds the `transient_metadata.enabled` and the `_sort` fields.
`transient_metadata.enabled` is set to `false` in case the role is automatically disabled, for example when the role grants privileges that are not allowed by the installed license.
`_sort` is present when the search query sorts on some field.
It contains the array of values that have been used for sorting. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
