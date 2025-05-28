# `AggregationsMatrixAggregation` [interface-AggregationsMatrixAggregation]

| Name | Type | Description |
| - | - | - |
| `fields` | [Fields](./Fields.md) | An array of fields for computing the statistics. |
| `missing` | Record<[Field](./Field.md), [double](./double.md)> | The value to apply to documents that do not have a value. By default, documents without a value are ignored. |
