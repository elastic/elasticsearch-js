## Interface `AggregationsFrequentItemSetsAggregation`

| Name | Type | Description |
| - | - | - |
| `fields` | [AggregationsFrequentItemSetsField](./AggregationsFrequentItemSetsField.md)[] | Fields to analyze. |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query that filters documents from analysis. |
| `minimum_set_size` | [integer](./integer.md) | The minimum size of one item set. |
| `minimum_support` | [double](./double.md) | The minimum support of one item set. |
| `size` | [integer](./integer.md) | The number of top item sets to return. |
