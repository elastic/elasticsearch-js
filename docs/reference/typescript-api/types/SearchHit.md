# SearchHit

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_index` | [`IndexName`](IndexName.md) | - |
| `_id?` | [`Id`](Id.md) | - |
| `_score?` | `double | null` | - |
| `_explanation?` | [`ExplainExplanation`](ExplainExplanation.md) | - |
| `fields?` | `Record<string, any>` | - |
| `highlight?` | `Record<string, string[]>` | - |
| `inner_hits?` | `Record<string, SearchInnerHitsResult>` | - |
| `matched_queries?` | `string[] | Record<string, double>` | - |
| `_nested?` | [`SearchNestedIdentity`](SearchNestedIdentity.md) | - |
| `_ignored?` | `string[]` | - |
| `ignored_field_values?` | `Record<string, any[]>` | - |
| `_shard?` | `string` | - |
| `_node?` | `string` | - |
| `_routing?` | `string` | - |
| `_source?` | [`TDocument`](TDocument.md) | - |
| `_rank?` | `integer` | - |
| `_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | - |
| `_primary_term?` | `long` | - |
| `_version?` | [`VersionNumber`](VersionNumber.md) | - |
| `sort?` | [`SortResults`](SortResults.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
