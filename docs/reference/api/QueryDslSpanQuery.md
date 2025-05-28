# `QueryDslSpanQuery` [interface-QueryDslSpanQuery]

| Name | Type | Description |
| - | - | - |
| `span_containing` | [QueryDslSpanContainingQuery](./QueryDslSpanContainingQuery.md) | Accepts a list of span queries, but only returns those spans which also match a second span query. |
| `span_field_masking` | [QueryDslSpanFieldMaskingQuery](./QueryDslSpanFieldMaskingQuery.md) | Allows queries like `span_near` or `span_or` across different fields. |
| `span_first` | [QueryDslSpanFirstQuery](./QueryDslSpanFirstQuery.md) | Accepts another span query whose matches must appear within the first N positions of the field. |
| `span_gap` | [QueryDslSpanGapQuery](./QueryDslSpanGapQuery.md) | &nbsp; |
| `span_multi` | [QueryDslSpanMultiTermQuery](./QueryDslSpanMultiTermQuery.md) | Wraps a `term`, `range`, `prefix`, `wildcard`, `regexp`, or `fuzzy` query. |
| `span_near` | [QueryDslSpanNearQuery](./QueryDslSpanNearQuery.md) | Accepts multiple span queries whose matches must be within the specified distance of each other, and possibly in the same order. |
| `span_not` | [QueryDslSpanNotQuery](./QueryDslSpanNotQuery.md) | Wraps another span query, and excludes any documents which match that query. |
| `span_or` | [QueryDslSpanOrQuery](./QueryDslSpanOrQuery.md) | Combines multiple span queriesandreturns documents which match any of the specified queries. |
| `span_term` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslSpanTermQuery](./QueryDslSpanTermQuery.md) | [FieldValue](./FieldValue.md)>> | The equivalent of the `term` query but for use with other span queries. |
| `span_within` | [QueryDslSpanWithinQuery](./QueryDslSpanWithinQuery.md) | The result from a single span query is returned as long is its span falls within the spans returned by a list of other span queries. |
