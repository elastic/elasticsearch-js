# `AggregationsTopHitsAggregation` [interface-AggregationsTopHitsAggregation]

| Name | Type | Description |
| - | - | - |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | Selects the fields of the source that are returned. |
| `docvalue_fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | Fields for which to return doc values. |
| `explain` | boolean | If `true`, returns detailed information about score computation as part of a hit. |
| `fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | Array of wildcard (*) patterns. The request returns values for field names matching these patterns in the hits.fields property of the response. |
| `from` | [integer](./integer.md) | Starting document offset. |
| `highlight` | [SearchHighlight](./SearchHighlight.md) | Specifies the highlighter to use for retrieving highlighted snippets from one or more fields in the search results. |
| `script_fields` | Record<string, [ScriptField](./ScriptField.md)> | Returns the result of one or more script evaluations for each hit. |
| `seq_no_primary_term` | boolean | If `true`, returns sequence number and primary term of the last modification of each hit. |
| `size` | [integer](./integer.md) | The maximum number of top matching hits to return per bucket. |
| `sort` | [Sort](./Sort.md) | Sort order of the top matching hits. By default, the hits are sorted by the score of the main query. |
| `stored_fields` | [Fields](./Fields.md) | Returns values for the specified stored fields (fields that use the `store` mapping option). |
| `track_scores` | boolean | If `true`, calculates and returns document scores, even if the scores are not used for sorting. |
| `version` | boolean | If `true`, returns document version as part of a hit. |
