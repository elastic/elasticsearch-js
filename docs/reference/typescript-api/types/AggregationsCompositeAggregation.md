# AggregationsCompositeAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `after?` | [`AggregationsCompositeAggregateKey`](AggregationsCompositeAggregateKey.md) | When paginating, use the `after_key` value returned in the previous response to retrieve the next page. |
| `size?` | `integer` | The number of composite buckets that should be returned. |
| `sources?` | `Partial<Record<string, AggregationsCompositeAggregationSource>>[]` | The value sources used to build composite buckets.
Keys are returned in the order of the `sources` definition. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
