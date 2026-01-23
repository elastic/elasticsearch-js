# QueryDslDecayPlacement

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `decay?` | `double` | Defines how documents are scored at the distance given at scale. |
| `offset?` | [`TScale`](TScale.md) | If defined, the decay function will only compute the decay function for documents with a distance greater than the defined `offset`. |
| `scale?` | [`TScale`](TScale.md) | Defines the distance from origin + offset at which the computed score will equal `decay` parameter. |
| `origin?` | [`TOrigin`](TOrigin.md) | The point of origin used for calculating distance. Must be given as a number for numeric field, date for date fields and geo point for geo fields. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
