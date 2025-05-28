# `SearchInnerHits` [interface-SearchInnerHits]

| Name | Type | Description |
| - | - | - |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | &nbsp; |
| `collapse` | [SearchFieldCollapse](./SearchFieldCollapse.md) | &nbsp; |
| `docvalue_fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | &nbsp; |
| `explain` | boolean | &nbsp; |
| `fields` | [Field](./Field.md)[] | &nbsp; |
| `from` | [integer](./integer.md) | Inner hit starting document offset. |
| `highlight` | [SearchHighlight](./SearchHighlight.md) | &nbsp; |
| `ignore_unmapped` | boolean | &nbsp; |
| `name` | [Name](./Name.md) | The name for the particular inner hit definition in the response. Useful when a search request contains multiple inner hits. |
| `script_fields` | Record<[Field](./Field.md), [ScriptField](./ScriptField.md)> | &nbsp; |
| `seq_no_primary_term` | boolean | &nbsp; |
| `size` | [integer](./integer.md) | The maximum number of hits to return per `inner_hits`. |
| `sort` | [Sort](./Sort.md) | How the inner hits should be sorted per `inner_hits`. By default, inner hits are sorted by score. |
| `stored_fields` | [Fields](./Fields.md) | &nbsp; |
| `track_scores` | boolean | &nbsp; |
| `version` | boolean | &nbsp; |
