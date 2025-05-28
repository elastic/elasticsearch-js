# `MigrationDeprecationsDeprecation` [interface-MigrationDeprecationsDeprecation]

| Name | Type | Description |
| - | - | - |
| `_meta` | Record<string, any> | &nbsp; |
| `details` | string | Optional details about the deprecation warning. |
| `level` | [MigrationDeprecationsDeprecationLevel](./MigrationDeprecationsDeprecationLevel.md) | The level property describes the significance of the issue. |
| `message` | string | Descriptive information about the deprecation warning. |
| `resolve_during_rolling_upgrade` | boolean | &nbsp; |
| `url` | string | A link to the breaking change documentation, where you can find more information about this change. |
