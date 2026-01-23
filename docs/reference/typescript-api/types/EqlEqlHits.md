# EqlEqlHits

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total?` | [`SearchTotalHits`](SearchTotalHits.md) | Metadata about the number of matching events or sequences. |
| `events?` | `EqlHitsEvent<TEvent>[]` | Contains events matching the query. Each object represents a matching event. |
| `sequences?` | `EqlHitsSequence<TEvent>[]` | Contains event sequences matching the query. Each object represents a matching sequence. This parameter is only returned for EQL queries containing a sequence. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
