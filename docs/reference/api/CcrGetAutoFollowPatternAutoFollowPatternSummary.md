# `CcrGetAutoFollowPatternAutoFollowPatternSummary` [interface-CcrGetAutoFollowPatternAutoFollowPatternSummary]

| Name | Type | Description |
| - | - | - |
| `active` | boolean | &nbsp; |
| `follow_index_pattern` | [IndexPattern](./IndexPattern.md) | The name of follower index. |
| `leader_index_exclusion_patterns` | [IndexPatterns](./IndexPatterns.md) | An array of simple index patterns that can be used to exclude indices from being auto-followed. |
| `leader_index_patterns` | [IndexPatterns](./IndexPatterns.md) | An array of simple index patterns to match against indices in the remote cluster specified by the remote_cluster field. |
| `max_outstanding_read_requests` | [integer](./integer.md) | The maximum number of outstanding reads requests from the remote cluster. |
| `remote_cluster` | string | The remote cluster containing the leader indices to match against. |
