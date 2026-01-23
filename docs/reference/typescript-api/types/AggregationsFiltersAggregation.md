# AggregationsFiltersAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `filters?` | `AggregationsBuckets<QueryDslQueryContainer>` | Collection of queries from which to build buckets. |
| `other_bucket?` | `boolean` | Set to `true` to add a bucket to the response which will contain all documents that do not match any of the given filters. |
| `other_bucket_key?` | `string` | The key with which the other bucket is returned. |
| `keyed?` | `boolean` | By default, the named filters aggregation returns the buckets as an object.
Set to `false` to return the buckets as an array of objects. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
