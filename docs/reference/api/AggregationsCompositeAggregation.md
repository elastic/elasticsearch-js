# `AggregationsCompositeAggregation` [interface-AggregationsCompositeAggregation]

| Name | Type | Description |
| - | - | - |
| `after` | [AggregationsCompositeAggregateKey](./AggregationsCompositeAggregateKey.md) | When paginating, use the `after_key` value returned in the previous response to retrieve the next page. |
| `size` | [integer](./integer.md) | The number of composite buckets that should be returned. |
| `sources` | Record<string, [AggregationsCompositeAggregationSource](./AggregationsCompositeAggregationSource.md)>[] | The value sources used to build composite buckets. Keys are returned in the order of the `sources` definition. |
