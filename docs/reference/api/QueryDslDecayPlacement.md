# `QueryDslDecayPlacement` [interface-QueryDslDecayPlacement]

| Name | Type | Description |
| - | - | - |
| `decay` | [double](./double.md) | Defines how documents are scored at the distance given at scale. |
| `offset` | TScale | If defined, the decay function will only compute the decay function for documents with a distance greater than the defined `offset`. |
| `origin` | TOrigin | The point of origin used for calculating distance. Must be given as a number for numeric field, date for date fields and geo point for geo fields. |
| `scale` | TScale | Defines the distance from origin + offset at which the computed score will equal `decay` parameter. |
