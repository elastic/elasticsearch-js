# `EqlHitsEvent` [interface-EqlHitsEvent]

| Name | Type | Description |
| - | - | - |
| `_id` | [Id](./Id.md) | Unique identifier for the event. This ID is only unique within the index. |
| `_index` | [IndexName](./IndexName.md) | Name of the index containing the event. |
| `_source` | TEvent | Original JSON body passed for the event at index time. |
| `fields` | Record<[Field](./Field.md), any[]> | &nbsp; |
| `missing` | boolean | Set to `true` for events in a timespan-constrained sequence that do not meet a given condition. |
