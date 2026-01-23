# CcrGetAutoFollowPatternAutoFollowPatternSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `active` | `boolean` | - |
| `remote_cluster` | `string` | The remote cluster containing the leader indices to match against. |
| `follow_index_pattern?` | [`IndexPattern`](IndexPattern.md) | The name of follower index. |
| `leader_index_patterns` | [`IndexPatterns`](IndexPatterns.md) | An array of simple index patterns to match against indices in the remote cluster specified by the remote_cluster field. |
| `leader_index_exclusion_patterns` | [`IndexPatterns`](IndexPatterns.md) | An array of simple index patterns that can be used to exclude indices from being auto-followed. |
| `max_outstanding_read_requests` | [`integer`](integer.md) | The maximum number of outstanding reads requests from the remote cluster. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
