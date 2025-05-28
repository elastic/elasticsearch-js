# `SearchHit` [interface-SearchHit]

| Name | Type | Description |
| - | - | - |
| `_explanation` | [ExplainExplanation](./ExplainExplanation.md) | &nbsp; |
| `_id` | [Id](./Id.md) | &nbsp; |
| `_ignored` | string[] | &nbsp; |
| `_index` | [IndexName](./IndexName.md) | &nbsp; |
| `_nested` | [SearchNestedIdentity](./SearchNestedIdentity.md) | &nbsp; |
| `_node` | string | &nbsp; |
| `_primary_term` | [long](./long.md) | &nbsp; |
| `_rank` | [integer](./integer.md) | &nbsp; |
| `_routing` | string | &nbsp; |
| `_score` | [double](./double.md) | null | &nbsp; |
| `_seq_no` | [SequenceNumber](./SequenceNumber.md) | &nbsp; |
| `_shard` | string | &nbsp; |
| `_source` | TDocument | &nbsp; |
| `_version` | [VersionNumber](./VersionNumber.md) | &nbsp; |
| `fields` | Record<string, any> | &nbsp; |
| `highlight` | Record<string, string[]> | &nbsp; |
| `ignored_field_values` | Record<string, any[]> | &nbsp; |
| `inner_hits` | Record<string, [SearchInnerHitsResult](./SearchInnerHitsResult.md)> | &nbsp; |
| `matched_queries` | string[] | Record<string, [double](./double.md)> | &nbsp; |
| `sort` | [SortResults](./SortResults.md) | &nbsp; |
