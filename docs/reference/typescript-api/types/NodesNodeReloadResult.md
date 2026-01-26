# NodesNodeReloadResult

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | - |
| `reload_exception?` | [`ErrorCause`](ErrorCause.md) | - |
| `secure_setting_names?` | `string`[] | The names of the secure settings that were reloaded. |
| `keystore_path?` | `string` | The path to the keystore file. |
| `keystore_digest?` | `string` | A SHA-256 hash of the keystore file contents. |
| `keystore_last_modified_time?` | [`DateTime`](DateTime.md) | The last modification time of the keystore file. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
