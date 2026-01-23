# AggregationsBucketSortAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `from?` | `integer` | Buckets in positions prior to `from` will be truncated. |
| `gap_policy?` | [`AggregationsGapPolicy`](AggregationsGapPolicy.md) | The policy to apply when gaps are found in the data. |
| `size?` | `integer` | The number of buckets to return.
Defaults to all buckets of the parent aggregation. |
| `sort?` | [`Sort`](Sort.md) | The list of fields to sort on. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
