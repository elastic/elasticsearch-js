# SearchInnerHits

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Name`](Name.md) | The name for the particular inner hit definition in the response.
Useful when a search request contains multiple inner hits. |
| `size?` | [`integer`](integer.md) | The maximum number of hits to return per `inner_hits`. |
| `from?` | [`integer`](integer.md) | Inner hit starting document offset. |
| `collapse?` | [`SearchFieldCollapse`](SearchFieldCollapse.md) | - |
| `docvalue_fields?` | `(QueryDslFieldAndFormat | Field)[]` | - |
| `explain?` | `boolean` | - |
| `highlight?` | [`SearchHighlight`](SearchHighlight.md) | - |
| `ignore_unmapped?` | `boolean` | - |
| `script_fields?` | `Record<Field, ScriptField>` | - |
| `seq_no_primary_term?` | `boolean` | - |
| `fields?` | [`Field`](Field.md)[] | - |
| `sort?` | [`Sort`](Sort.md) | How the inner hits should be sorted per `inner_hits`.
By default, inner hits are sorted by score. |
| `_source?` | [`SearchSourceConfig`](SearchSourceConfig.md) | - |
| `stored_fields?` | [`Fields`](Fields.md) | - |
| `track_scores?` | `boolean` | - |
| `version?` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
