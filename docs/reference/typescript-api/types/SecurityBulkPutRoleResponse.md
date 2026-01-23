# SecurityBulkPutRoleResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `created?` | `string[]` | Array of created roles |
| `updated?` | `string[]` | Array of updated roles |
| `noop?` | `string[]` | Array of role names without any changes |
| `errors?` | [`SecurityBulkError`](SecurityBulkError.md) | Present if any updates resulted in errors |

## See Also

- [All Types](./)
- [API Methods](../index.md)
