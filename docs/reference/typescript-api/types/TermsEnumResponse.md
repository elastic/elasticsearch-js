# TermsEnumResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | - |
| `terms` | `string[]` | - |
| `complete` | `boolean` | If `false`, the returned terms set may be incomplete and should be treated as approximate.
This can occur due to a few reasons, such as a request timeout or a node error. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
