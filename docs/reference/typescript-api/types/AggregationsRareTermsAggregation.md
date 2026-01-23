# AggregationsRareTermsAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `exclude?` | [`AggregationsTermsExclude`](AggregationsTermsExclude.md) | Terms that should be excluded from the aggregation. |
| `field?` | [`Field`](Field.md) | The field from which to return rare terms. |
| `include?` | [`AggregationsTermsInclude`](AggregationsTermsInclude.md) | Terms that should be included in the aggregation. |
| `max_doc_count?` | `long` | The maximum number of documents a term should appear in. |
| `missing?` | [`AggregationsMissing`](AggregationsMissing.md) | The value to apply to documents that do not have a value.
By default, documents without a value are ignored. |
| `precision?` | `double` | The precision of the internal CuckooFilters.
Smaller precision leads to better approximation, but higher memory usage. |
| `value_type?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
