## Interface `SecurityBulkPutRoleResponse`

| Name | Type | Description |
| - | - | - |
| `created` | string[] | Array of created roles |
| `errors` | [SecurityBulkError](./SecurityBulkError.md) | Present if any updates resulted in errors |
| `noop` | string[] | Array of role names without any changes |
| `updated` | string[] | Array of updated roles |
