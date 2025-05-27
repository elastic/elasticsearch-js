## Interface `SecurityBulkDeleteRoleResponse`

| Name | Type | Description |
| - | - | - |
| `deleted` | string[] | Array of deleted roles |
| `errors` | [SecurityBulkError](./SecurityBulkError.md) | Present if any deletes resulted in errors |
| `not_found` | string[] | Array of roles that could not be found |
