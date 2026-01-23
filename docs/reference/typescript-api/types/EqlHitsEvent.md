# EqlHitsEvent

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_index` | [`IndexName`](IndexName.md) | Name of the index containing the event. |
| `_id` | [`Id`](Id.md) | Unique identifier for the event. This ID is only unique within the index. |
| `_source` | [`TEvent`](TEvent.md) | Original JSON body passed for the event at index time. |
| `missing?` | `boolean` | Set to `true` for events in a timespan-constrained sequence that do not meet a given condition. |
| `fields?` | `Record<Field, any[]>` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
